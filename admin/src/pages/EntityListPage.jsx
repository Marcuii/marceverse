import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { reorderItems } from '../services/api';
import ConfirmModal from '../components/ConfirmModal';
import SortableRow from '../components/SortableRow';
import entityConfig from '../config/entityConfig';
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

/**
 * Generic list page driven entirely by entityConfig.
 * Renders a drag-and-drop sortable table with edit / delete actions.
 *
 * Usage:  <Route path="experience" element={<EntityListPage entity="experience" />} />
 */
const EntityListPage = () => {
  const { entity } = useParams();
  const cfg = entityConfig[entity];

  const [items, setItems] = useState([]);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const loadItems = async () => {
    try {
      const res = await cfg.api.getAll();
      setItems(res.data);
    } catch (error) {
      console.error(`Error loading ${cfg.plural}`, error);
    }
  };

  // Reload items when entity type changes (or on mount)
  useEffect(() => {
    if (cfg) loadItems();
  }, [entity]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!cfg) return <div className="p-6 text-error">Unknown entity type: {entity}</div>;

  const handleDeleteClick = (id) => {
    setItemToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (itemToDelete) {
      try {
        await cfg.api.delete(itemToDelete);
        loadItems();
        setDeleteModalOpen(false);
        setItemToDelete(null);
      } catch (error) {
        console.error(`Error deleting ${cfg.singular}`, error);
      }
    }
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((prev) => {
        const oldIndex = prev.findIndex((i) => i._id === active.id);
        const newIndex = prev.findIndex((i) => i._id === over.id);
        const newItems = arrayMove(prev, oldIndex, newIndex);

        const reorderData = newItems.map((item, index) => ({
          _id: item._id,
          order: index,
        }));

        reorderItems(cfg.slug, reorderData).catch((err) => {
          console.error(`Failed to reorder ${cfg.plural}`, err);
          loadItems();
        });

        return newItems;
      });
    }
  };

  const secondaryKey = cfg.secondaryField.key;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-primary">{cfg.plural}</h2>
        <Link to={`/${cfg.slug}/new`} className="btn btn-primary">
          Add New {cfg.singular}
        </Link>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg bg-base-100">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <table className="table w-full">
            <thead>
              <tr className="bg-base-200 text-base-content">
                <th className="w-10"></th>
                <th>Title</th>
                <th>{cfg.secondaryField.columnHeader}</th>
                <th>{cfg.periodLabel ?? 'Period'}</th>
                <th>Actions</th>
              </tr>
            </thead>
            <SortableContext items={items.map((i) => i._id)} strategy={verticalListSortingStrategy}>
              <tbody>
                {items.map((item) => (
                  <SortableRow key={item._id} id={item._id}>
                    <td className="font-bold text-lg">{item.title}</td>
                    <td className="text-accent">{item[secondaryKey]}</td>
                    <td>
                      <span className="badge badge-ghost">{item.period}</span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <Link to={`/${cfg.slug}/edit/${item.id}`} className="btn btn-sm btn-info">
                          Edit
                        </Link>
                        <button onClick={() => handleDeleteClick(item.id)} className="btn btn-sm btn-error">
                          Delete
                        </button>
                      </div>
                    </td>
                  </SortableRow>
                ))}
                {items.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      No {cfg.singular.toLowerCase()} records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </SortableContext>
          </table>
        </DndContext>
      </div>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title={`Delete ${cfg.singular}`}
        message={`Are you sure you want to delete this ${cfg.singular.toLowerCase()} entry? This action cannot be undone.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteModalOpen(false)}
        confirmText="Delete"
        type="error"
      />
    </div>
  );
};

export default EntityListPage;
