/**
 * @file SortableRow.jsx
 * @description A table row that can be reordered via drag-and-drop.
 *
 * Built on `@dnd-kit/sortable`.  The first cell renders a drag handle;
 * child `<td>` elements are passed through via `{children}`.
 *
 * @param {{ id: string, children: React.ReactNode }} props
 */

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MdDragIndicator } from 'react-icons/md';

const SortableRow = ({ id, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 2 : 1,
    position: 'relative',
  };

  return (
    <tr ref={setNodeRef} style={style} className={isDragging ? "bg-base-200 opacity-50" : ""}>
      <td {...attributes} {...listeners} className="cursor-grab hover:text-primary">
        <MdDragIndicator size={20} />
      </td>
      {children}
    </tr>
  );
};

export default SortableRow;
