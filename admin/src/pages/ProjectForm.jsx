/**
 * @file ProjectForm.jsx
 * @description Create / edit form for a single Project.
 *
 * Handles single image upload with live preview, comma-delimited tags,
 * and optional category / demo URL fields.
 */

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createProject, getProjects, updateProject } from '../services/api';

const ProjectForm = () => {
    const { register, handleSubmit, setValue } = useForm();
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;
    const [previewImage, setPreviewImage] = useState(null);

    const loadProject = async () => {
        // Client side filtering:
        const res = await getProjects();
        const project = res.data.find(p => p._id === id);
        if (project) {
            setValue('name', project.name);
            setValue('description', project.description);
            setValue('category', project.category); // Set category
            setValue('repo', project.repo);
            setValue('demo', project.demo);
            setValue('tags', project.tags.join(', '));
            setPreviewImage(project.image);
        }
    };

    useEffect(() => {
        if (isEditMode) {
            loadProject();
        }
    }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('category', data.category); // Append category
        formData.append('repo', data.repo);
        formData.append('demo', data.demo);
        formData.append('tags', data.tags); // String, backend splits it
        
        if (data.image[0]) {
            formData.append('image', data.image[0]);
        }

        try {
            if (isEditMode) {
                await updateProject(id, formData);
            } else {
                await createProject(formData);
            }
            navigate('/projects');
        } catch (error) {
            console.error('Error saving project:', error);
            alert('Failed to save project');
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">{isEditMode ? 'Edit Project' : 'New Project'}</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Project Name</span></label>
                        <input type="text" {...register('name', { required: true })} className="input input-bordered w-full" />
                    </div>
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Category</span></label>
                        <input type="text" {...register('category', { required: true })} className="input input-bordered w-full" placeholder="e.g. Frontend" />
                    </div>
                </div>

                <div className="form-control w-full">
                    <label className="label"><span className="label-text">Description</span></label>
                    <textarea {...register('description', { required: true })} className="textarea textarea-bordered h-24"></textarea>
                </div>

                <div className="form-control w-full">
                    <label className="label"><span className="label-text">Tags (comma separated)</span></label>
                    <input type="text" {...register('tags')} className="input input-bordered w-full" placeholder="React, Node.js, Tailwind" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Repository URL</span></label>
                        <input type="url" {...register('repo', { required: true })} className="input input-bordered w-full" />
                    </div>
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Demo URL</span></label>
                        <input type="url" {...register('demo')} className="input input-bordered w-full" />
                    </div>
                </div>

                <div className="form-control w-full">
                    <label className="label"><span className="label-text">Project Image</span></label>
                    <input type="file" {...register('image')} className="file-input file-input-bordered w-full" onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                            setPreviewImage(URL.createObjectURL(e.target.files[0]));
                        }
                    }} />
                    {previewImage && (
                        <div className="mt-4">
                            <img src={previewImage} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
                        </div>
                    )}
                </div>

                <button type="submit" className="btn btn-primary w-full mt-6">
                    {isEditMode ? 'Update Project' : 'Create Project'}
                </button>
            </form>
        </div>
    );
};

export default ProjectForm;
