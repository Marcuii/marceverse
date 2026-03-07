/**
 * @file GeneralInfo.jsx
 * @description Editor for the singleton site-wide configuration document.
 *
 * Manages hero section, about section, roles (typewriter), contact/CV,
 * social media links, and skills grouped by category.  Uses
 * `react-hook-form` with nested `useFieldArray` for dynamic lists.
 */

import { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { getGeneralInfo, updateGeneralInfo } from '../services/api';
import Toast from '../components/Toast';

/**
 * Collapsible skill-category editor rendered inside the GeneralInfo form.
 *
 * Each category contains a dynamic list of skills (name + level + icon).
 *
 * @param {{ nestIndex: number, control: object, register: Function, removeCategory: Function }} props
 */
const SkillCategory = ({ nestIndex, control, register, removeCategory }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: `skills.${nestIndex}.items`
    });

    return (
        <div className="collapse collapse-arrow bg-base-100 border border-base-300 mb-2">
            <input type="checkbox" /> 
            <div className="collapse-title text-xl font-medium flex justify-between items-center">
                <div className="flex-1 mr-4 z-20 relative">
                    <input 
                        {...register(`skills.${nestIndex}.category`)} 
                        className="input input-ghost w-full font-bold" 
                        placeholder="Category Name"
                        onClick={(e) => e.stopPropagation()} 
                    />
                </div>
                <button type="button" onClick={() => removeCategory(nestIndex)} className="btn btn-error btn-xs z-20 relative">Delete Category</button>
            </div>
            <div className="collapse-content p-4 overflow-x-auto">
                <div className="space-y-4 min-w-[600px]">
                    {fields.map((item, k) => (
                        <div key={item.id} className="flex gap-2 items-center border-b pb-2">
                            <div className="form-control w-1/3">
                                <label className="label-text text-xs">Skill</label>
                                <input {...register(`skills.${nestIndex}.items.${k}.name`)} className="input input-sm input-bordered" placeholder="Name" />
                            </div>
                            <div className="form-control w-1/4">
                                <label className="label-text text-xs">Level (%)</label>
                                <input 
                                    type="number" 
                                    {...register(`skills.${nestIndex}.items.${k}.level`, { valueAsNumber: true })} 
                                    className="input input-sm input-bordered" 
                                    placeholder="90" 
                                />
                            </div>
                            <div className="form-control w-1/3">
                                <label className="label-text text-xs">Icon (e.g. FaReact)</label>
                                <input {...register(`skills.${nestIndex}.items.${k}.icon`)} className="input input-sm input-bordered" placeholder="Icon" />
                            </div>
                            <button type="button" onClick={() => remove(k)} className="btn btn-ghost btn-xs text-error mt-6">X</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => append({ name: "", level: 0, icon: "" })} className="btn btn-xs btn-outline btn-secondary">+ Add Skill</button>
                </div>
            </div>
        </div>
    );
};

const GeneralInfo = () => {
    const { register, control, handleSubmit, setValue } = useForm();
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState(null);
    const [heroPreview, setHeroPreview] = useState(null);
    const [aboutPreview, setAboutPreview] = useState(null);

    const { fields: socialFields, append: appendSocial, remove: removeSocial } = useFieldArray({
        control,
        name: "socials"
    });

    const { fields: skillCategoryFields, append: appendSkillCategory, remove: removeSkillCategory } = useFieldArray({
        control,
        name: "skills"
    });

    const loadGeneralInfo = async () => {
        try {
            const res = await getGeneralInfo();
            const data = res.data;
            
            setValue('name', data.name);
            setValue('tagline', data.tagline);
            setValue('heroDescription', data.heroDescription);
            setValue('about.title', data.about.title);
            setValue('about.description', data.about.description);
            // setValue('about.image', data.about.image); // No longer needed for file input, set preview instead
            setValue('cv.file', data.cv.file); 
            setValue('cv.link', data.cv.link);
            setValue('contact.email', data.contact.email);
            setValue('contact.phone', data.contact.phone);

            if (data.heroImage) setHeroPreview(data.heroImage);
            if (data.about && data.about.image) setAboutPreview(data.about.image);

            if (data.role && Array.isArray(data.role)) {
                setValue('role_text', data.role.join('\n'));
            }

            setValue('socials', data.socials);

            if (data.skills && Array.isArray(data.skills)) {
                setValue('skills', data.skills);
            }

            setLoading(false);
        } catch (error) {
            console.error("Error loading general info", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        loadGeneralInfo();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('tagline', data.tagline);
            formData.append('heroDescription', data.heroDescription);
            
            // Construct complex objects
            const about = {
                title: data.about.title,
                description: data.about.description,
                image: aboutPreview // This might be stale if new file uploaded, backend handles replacement via file
            };
            formData.append('about', JSON.stringify(about));

            const cv = {
                file: data.cv.file,
                link: data.cv.link
            };
            formData.append('cv', JSON.stringify(cv));

            const contact = {
                email: data.contact.email,
                phone: data.contact.phone
            };
            formData.append('contact', JSON.stringify(contact));

            const role = data.role_text.split('\n').filter(r => r.trim() !== '');
            formData.append('role', JSON.stringify(role)); // Send as JSON string for array

            formData.append('socials', JSON.stringify(data.socials));
            formData.append('skills', JSON.stringify(data.skills));

            // Handle Files
            if (data.heroImageFile && data.heroImageFile[0]) {
                formData.append('heroImage', data.heroImageFile[0]);
            }
            if (data.aboutImageFile && data.aboutImageFile[0]) {
                formData.append('aboutImage', data.aboutImageFile[0]);
            }

            await updateGeneralInfo(formData); // This now sends FormData
            setToast({ message: 'General Info Updated Successfully!', type: 'success' });
        } catch (error) {
            console.error("Error updating general info", error);
            setToast({ message: 'Failed to update general info.', type: 'error' });
        }
    };

    if (loading) return <div className="p-10">Loading...</div>;

    return (
        <div className="max-w-5xl mx-auto pb-20 p-6 bg-base-100 rounded-lg shadow-xl relative">
            <h2 className="text-3xl font-bold mb-6 text-primary">General Information</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                
                {/* Basic Info */}
                <div className="card bg-base-200 shadow-md p-6">
                    <h3 className="text-xl font-bold mb-4">Basic Profile & Hero</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label"><span className="label-text">Full Name</span></label>
                            <input {...register('name')} className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Tagline</span></label>
                            <input {...register('tagline')} className="input input-bordered" />
                        </div>
                    </div>
                    <div className="form-control mt-4">
                        <label className="label"><span className="label-text">Hero Description</span></label>
                        <textarea {...register('heroDescription')} className="textarea textarea-bordered" />
                    </div>
                    <div className="form-control mt-4">
                        <label className="label"><span className="label-text">Hero Image</span></label>
                        <input 
                            type="file" 
                            {...register('heroImageFile')} 
                            className="file-input file-input-bordered w-full" 
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    setHeroPreview(URL.createObjectURL(e.target.files[0]));
                                }
                            }}
                        />
                        {heroPreview && (
                            <div className="mt-4">
                                <img src={heroPreview} alt="Hero Preview" className="w-32 h-32 object-cover rounded-lg border" />
                            </div>
                        )}
                    </div>
                </div>

                 <div className="card bg-base-200 shadow-md p-6">
                    <h3 className="text-xl font-bold mb-4">Roles (One per line)</h3>
                    <div className="form-control">
                        <textarea 
                            className="textarea textarea-bordered h-24" 
                            placeholder="Developer&#10;Designer"
                            {...register('role_text')}
                        /> 
                    </div>
                </div>

                {/* About Section */}
                <div className="card bg-base-200 shadow-md p-6">
                    <h3 className="text-xl font-bold mb-4">About Section</h3>
                    <div className="form-control mb-4">
                        <label className="label"><span className="label-text">Title</span></label>
                        <input {...register('about.title')} className="input input-bordered" />
                    </div>
                    <div className="form-control mb-4">
                        <label className="label"><span className="label-text">Description</span></label>
                        <textarea {...register('about.description')} className="textarea textarea-bordered h-32" />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text">About Image</span></label>
                        <input 
                            type="file" 
                            {...register('aboutImageFile')} 
                            className="file-input file-input-bordered w-full" 
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    setAboutPreview(URL.createObjectURL(e.target.files[0]));
                                }
                            }}
                        />
                        {aboutPreview && (
                            <div className="mt-4">
                                <img src={aboutPreview} alt="About Preview" className="w-32 h-32 object-cover rounded-lg border" />
                            </div>
                        )}
                    </div>
                </div>

                 {/* Contact & CV */}
                 <div className="card bg-base-200 shadow-md p-6">
                    <h3 className="text-xl font-bold mb-4">Contact & CV</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label"><span className="label-text">Email</span></label>
                            <input {...register('contact.email')} className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Phone</span></label>
                            <input {...register('contact.phone')} className="input input-bordered" />
                        </div>
                        {/* CV File Path Removed */}
                        <div className="form-control">
                            <label className="label"><span className="label-text">CV Link</span></label>
                            <input {...register('cv.link')} className="input input-bordered" />
                        </div>
                    </div>
                </div>

                {/* Socials */}
                <div className="card bg-base-200 shadow-md p-6">
                    <h3 className="text-xl font-bold mb-4">Social Media</h3>
                    {socialFields.map((field, index) => (
                        <div key={field.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 items-end border-b pb-4">
                            <div className="form-control">
                                <label className="label"><span className="label-text">Platform</span></label>
                                <input {...register(`socials.${index}.platform`)} className="input input-bordered" placeholder="GitHub" />
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text">URL</span></label>
                                <input {...register(`socials.${index}.url`)} className="input input-bordered" placeholder="https://..." />
                            </div>
                            <div className="form-control flex flex-row gap-2">
                                <div className="w-full">
                                    <label className="label">
                                        <span className="label-text">Icon Name</span>
                                        <a href="https://react-icons.github.io/react-icons/" target="_blank" rel="noopener noreferrer" className="label-text-alt link link-primary">Search Icons ↗</a>
                                    </label>
                                    <input {...register(`socials.${index}.icon`)} className="input input-bordered w-full" placeholder="e.g. FaGithub" />
                                </div>
                                <button type="button" onClick={() => removeSocial(index)} className="btn btn-error btn-square mb-0.5 self-end">X</button>
                            </div>
                        </div>
                    ))}
                    <button type="button" onClick={() => appendSocial({ platform: "", url: "", icon: "" })} className="btn btn-secondary btn-sm mt-2">Add Social</button>
                </div>
                
                 {/* Skills */}
                 <div className="card bg-base-200 shadow-md p-6">
                    <h3 className="text-xl font-bold mb-4">Skills</h3>
                    <div className="alert alert-info shadow-lg mb-4">
                        <div>
                            <span>Manage skill categories and individual skills. Use icon names from <a href="https://react-icons.github.io/react-icons/" target="_blank" rel="noopener noreferrer" className="underline font-bold">React Icons</a> (e.g., FaReact).</span>
                        </div>
                    </div>
                    {skillCategoryFields.map((field, index) => (
                        <SkillCategory 
                            key={field.id} 
                            nestIndex={index} 
                            control={control} 
                            register={register} 
                            removeCategory={removeSkillCategory} 
                        />
                    ))}
                     <button type="button" onClick={() => appendSkillCategory({ category: "New Category", items: [] })} className="btn btn-secondary btn-sm mt-2">Add Skill Category</button>
                </div>


                <button type="submit" className="btn btn-primary btn-lg w-full">Save General Info</button>
            </form>
            {toast && (
                <Toast 
                    message={toast.message} 
                    type={toast.type} 
                    onClose={() => setToast(null)} 
                />
            )}
        </div>
    );
};

export default GeneralInfo;
