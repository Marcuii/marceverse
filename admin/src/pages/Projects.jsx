/**
 * @file Projects.jsx
 * @description Drag-and-drop sortable list page for Project entries.
 *
 * Renders a table with cover-image thumbnails, category badges, and
 * tag chips.  Supports inline reordering via `@dnd-kit` and delete
 * confirmation via `ConfirmModal`.
 */

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProjects, deleteProject, reorderItems } from '../services/api';
import ConfirmModal from '../components/ConfirmModal';
import SortableRow from '../components/SortableRow';
import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const loadProjects = async () => {
        const res = await getProjects();
        setProjects(res.data);
    };

    useEffect(() => {
        loadProjects();
    }, []);

    const handleDeleteClick = (id) => {
        setProjectToDelete(id);
        setDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (projectToDelete) {
            await deleteProject(projectToDelete);
            loadProjects();
            setDeleteModalOpen(false);
            setProjectToDelete(null);
        }
    };

    const handleDragEnd = async (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            setProjects((items) => {
                const oldIndex = items.findIndex((item) => item._id === active.id);
                const newIndex = items.findIndex((item) => item._id === over.id);
                const newItems = arrayMove(items, oldIndex, newIndex);
                
                // Prepare reorder data for backend
                const reorderData = newItems.map((item, index) => ({
                    _id: item._id,
                    order: index
                }));
                
                // Call API (optimistic UI update)
                reorderItems('projects', reorderData).catch(err => {
                    console.error("Failed to reorder projects", err);
                    loadProjects(); // Revert on error
                });

                return newItems;
            });
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">Projects</h2>
                <Link to="/projects/new" className="btn btn-primary">Add New Project</Link>
            </div>
            <div className="overflow-x-auto">
                <DndContext 
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th className="w-10"></th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Tags</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <SortableContext 
                            items={projects.map(p => p._id)}
                            strategy={verticalListSortingStrategy}
                        >
                            <tbody>
                                {projects.map(project => (
                                    <SortableRow key={project._id} id={project._id}>
                                        <td>
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={project.image} alt={project.name} />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="font-bold">{project.name}</td>
                                        <td><span className="badge badge-outline h-auto py-1 text-center">{project.category || 'Other'}</span></td>
                                        <td className="max-w-xs truncate" title={project.description}>{project.description}</td>
                                        <td>
                                            <div className="flex flex-wrap gap-1">
                                                {project.tags.map(tag => (
                                                    <span key={tag} className="badge badge-sm">{tag}</span>
                                                ))}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-2">
                                                <Link to={`/projects/edit/${project._id}`} className="btn btn-sm btn-info">Edit</Link>
                                                <button onClick={() => handleDeleteClick(project._id)} className="btn btn-sm btn-error">Delete</button>
                                            </div>
                                        </td>
                                    </SortableRow>
                                ))}
                            </tbody>
                        </SortableContext>
                    </table>
                </DndContext>
            </div>

            <ConfirmModal 
                isOpen={isDeleteModalOpen}
                title="Delete Project"
                message="Are you sure you want to delete this project? This action cannot be undone."
                onConfirm={confirmDelete}
                onCancel={() => setDeleteModalOpen(false)}
                confirmText="Delete"
                type="error"
            />
        </div>
    );
};

export default Projects;
