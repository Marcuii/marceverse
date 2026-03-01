import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import entityConfig from '../config/entityConfig';
import { entitySchema } from '../config/entitySchema';

/** Inline error message for a single field */
const FieldError = ({ errors, name }) =>
  errors[name] ? <p className="text-error text-sm mt-1">{errors[name].message}</p> : null;

/**
 * Generic create / edit form driven by entityConfig + Zod schema.
 *
 * URL pattern: /:entity/new  or  /:entity/edit/:id
 */
const EntityFormPage = () => {
  const { entity, id } = useParams();
  const cfg = entityConfig[entity];
  const navigate = useNavigate();
  const isEditMode = !!id;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(entitySchema),
    defaultValues: {
      id: '',
      title: '',
      secondaryField: '',
      type: '',
      period: '',
      shortDescription: '',
      longDescription: '',
      skills: '',
    },
  });

  const [existingImages, setExistingImages] = useState([]);

  const loadEntity = async () => {
    try {
      const res = await cfg.api.getById(id);
      const data = res.data;
      setValue('id', data.id);
      setValue('title', data.title);
      setValue('secondaryField', data[cfg.secondaryField.key] ?? '');
      setValue('type', data.type ?? '');
      setValue('period', data.period);
      setValue('shortDescription', data.shortDescription);

      if (data.details) {
        setValue(
          'longDescription',
          data.details.longDescription ? data.details.longDescription.join('\n') : '',
        );
        setValue('skills', data.details.skills ? data.details.skills.join(', ') : '');
        if (data.details.images) setExistingImages(data.details.images);
      }
    } catch (error) {
      console.error(`Error loading ${cfg.singular}:`, error);
    }
  };

  // Reset form state when entity type or id changes
  useEffect(() => {
    if (cfg && isEditMode) loadEntity();
  }, [entity, id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!cfg) return <div className="p-6 text-error">Unknown entity type: {entity}</div>;

  const onSubmit = async (formValues) => {
    const formData = new FormData();
    formData.append('id', formValues.id);
    formData.append('title', formValues.title);
    formData.append(cfg.secondaryField.key, formValues.secondaryField);
    formData.append('type', formValues.type);
    formData.append('period', formValues.period);
    formData.append('shortDescription', formValues.shortDescription);

    const details = {
      longDescription: formValues.longDescription
        .split('\n')
        .filter((line) => line.trim() !== ''),
      skills: formValues.skills
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s !== ''),
      images: existingImages,
    };
    formData.append('details', JSON.stringify(details));

    if (formValues.newImages && formValues.newImages.length > 0) {
      for (let i = 0; i < formValues.newImages.length; i++) {
        formData.append('images', formValues.newImages[i]);
      }
    }

    try {
      if (isEditMode) {
        await cfg.api.update(id, formData);
      } else {
        await cfg.api.create(formData);
      }
      navigate(`/${cfg.slug}`);
    } catch (error) {
      console.error(`Error saving ${cfg.singular}:`, error);
      alert(`Failed to save ${cfg.singular.toLowerCase()}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-10 p-6 bg-base-100 rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-primary">
        {isEditMode ? `Edit ${cfg.singular}` : `New ${cfg.singular}`}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* ---- Row: ID ---- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Unique ID (e.g., {cfg.idPrefix}-1)</span>
            </label>
            <input
              type="text"
              {...register('id')}
              className={`input input-bordered w-full ${errors.id ? 'input-error' : ''}`}
              disabled={isEditMode}
              placeholder="Unique Identifier"
            />
            <FieldError errors={errors} name="id" />
          </div>
        </div>

        {/* ---- Row: Title + Secondary field ---- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">{cfg.titleLabel}</span>
            </label>
            <input
              type="text"
              {...register('title')}
              className={`input input-bordered w-full ${errors.title ? 'input-error' : ''}`}
              placeholder={cfg.titlePlaceholder}
            />
            <FieldError errors={errors} name="title" />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">{cfg.secondaryField.label}</span>
            </label>
            <input
              type="text"
              {...register('secondaryField')}
              className={`input input-bordered w-full ${errors.secondaryField ? 'input-error' : ''}`}
              placeholder={cfg.secondaryField.placeholder}
            />
            <FieldError errors={errors} name="secondaryField" />
          </div>
        </div>

        {/* ---- Row: Type + Period ---- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Type ({cfg.typeHint})</span>
            </label>
            <input
              type="text"
              {...register('type')}
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">{cfg.periodLabel}</span>
            </label>
            <input
              type="text"
              {...register('period')}
              className={`input input-bordered w-full ${errors.period ? 'input-error' : ''}`}
              placeholder={cfg.periodPlaceholder}
            />
            <FieldError errors={errors} name="period" />
          </div>
        </div>

        {/* ---- Short Description ---- */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-semibold">Short Description (Card View)</span>
          </label>
          <textarea
            {...register('shortDescription')}
            className={`textarea textarea-bordered h-24 ${errors.shortDescription ? 'textarea-error' : ''}`}
            placeholder="Brief summary..."
          />
          <FieldError errors={errors} name="shortDescription" />
        </div>

        <div className="divider">Details</div>

        {/* ---- Long Description ---- */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-semibold">Long Description (One paragraph per line)</span>
          </label>
          <textarea
            {...register('longDescription')}
            className="textarea textarea-bordered h-40"
            placeholder="Detailed description..."
          />
        </div>

        {/* ---- Skills ---- */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-semibold">Skills (comma separated)</span>
          </label>
          <input
            type="text"
            {...register('skills')}
            className="input input-bordered w-full"
            placeholder={cfg.skillsPlaceholder}
          />
        </div>

        {/* ---- Images ---- */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-semibold">Images</span>
          </label>
          <input
            type="file"
            multiple
            {...register('newImages')}
            className="file-input file-input-bordered w-full"
          />

          {existingImages.length > 0 && (
            <div className="mt-4">
              <h4 className="font-bold mb-2">Existing Images:</h4>
              <div className="flex flex-wrap gap-4">
                {existingImages.map((img, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={img}
                      alt="Existing"
                      className="w-24 h-24 object-cover rounded-lg border border-base-300"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setExistingImages((prev) => prev.filter((_, i) => i !== index))
                      }
                      className="absolute -top-2 -right-2 btn btn-xs btn-circle btn-error opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary w-full mt-6 text-lg"
        >
          {isSubmitting
            ? 'Saving…'
            : isEditMode
              ? `Update ${cfg.singular}`
              : `Create ${cfg.singular}`}
        </button>
      </form>
    </div>
  );
};

export default EntityFormPage;
