import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Save, 
  Image as ImageIcon, 
  DollarSign, 
  Clock, 
  User, 
  BookOpen, 
  Star, 
  Users, 
  Layers,
  FileText,
  List,
  Upload,
  
} from 'lucide-react';
import useAxiosPrivate from '@/url/useAxiosPrivate';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { Slide, toast, ToastContainer } from 'react-toastify';

export type CourseForm = {
  title: string;
  drive: string;
  instructor: string;
  priceUSD: string;
  priceBDT: string;
  rating: string;
  students: string;
  duration: string;
  level: string;
  image: string | File | null;
  description: string;
  fullDescription: string;
  curriculum: string[];
  whatYouLearn: string[];
};

const AddCourse: React.FC = () => {
  const [img,setImg] = useState<File | null>(null);
  const [formData, setFormData] = useState<CourseForm>({
    title: '',
    drive: '',
    instructor: '',
    priceUSD: '',
    priceBDT: '',
    rating: '4.5',
    students: '0',
    duration: '',
    level: 'Beginner',
    image: null, // Changed to hold the File object
    description: '',
    fullDescription: '',
    curriculum: [''],
    whatYouLearn: ['']
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null); // State for the preview URL
  const [loading, setLoading] = useState<boolean>(false);

  // Handle standard text inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      // cast to any here to allow dynamic key assignment
      [name]: value
    } as unknown as CourseForm));
  };
  const handleDrive = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value } as CourseForm));
};

  // Handle Image Upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setImg(file);
    if (file) {
      // keep formData.image in sync with chosen File
      setFormData(prev => ({
        ...prev,
        image: file
      } as CourseForm));
      // Create a local URL for preview
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  // Remove selected image
  const removeImage = () => {
    setImg(null);
    setFormData(prev => ({ ...prev, image: null } as CourseForm));
    setImagePreview(null);
  };

  // Handle dynamic array inputs (curriculum, whatYouLearn)
  const handleArrayChange = (index: number, field: 'curriculum' | 'whatYouLearn', value: string) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData(prev => ({
      ...prev,
      [field]: newArray
    } as CourseForm));
  };

  const addArrayItem = (field: 'curriculum' | 'whatYouLearn') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    } as CourseForm));
  };

  const removeArrayItem = (index: number, field: 'curriculum' | 'whatYouLearn') => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      [field]: newArray
    } as CourseForm));
  };

  const axiosPrivate = useAxiosPrivate()

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!img) {
        setLoading(false);
        return alert('Please upload an image');
      }
      const data = new FormData();
      data.append("file", img);
      data.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET)
      data.append("cloud_name", import.meta.env.VITE_CLOUD_NAME)

      const res = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload` , data)
      const uploadedUrl = res.data.url;
      // update form state and preview with uploaded URL
      setFormData(prev => ({
        ...prev,
        image: uploadedUrl
      } as CourseForm));
      setImagePreview(uploadedUrl);
      // clear the local File reference since image is uploaded
      setImg(null);
      
    } catch (error) {
      console.error('Error uploading image:', error);
    }
    
    // formData state update above is async — build payload explicitly
    const payload: CourseForm = {
      ...formData,
      image: (typeof formData.image === 'string' && formData.image) ? formData.image : imagePreview
    };
    console.log('Form Submitted payload:', payload);
    await mutateAsync(payload)

    setLoading(false);
    
    
  };

  const { mutateAsync } = useMutation({
    mutationFn: async (d : CourseForm) => {
      const response = await axiosPrivate.post('/addCourse', d);
      return response.data;
    },
    onSuccess: ()=>{
      setLoading(false);
       toast.success("Course Added Successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
    },
    onError: ()=>{
      setLoading(false);
      toast.error("Failed to Add Course!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
    }
  })

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <ToastContainer></ToastContainer>
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Add New Course</h1>
            <p className="text-gray-500 mt-1">Create a new course entry for the platform.</p>
          </div>
          <div className="flex gap-3">
            <button 
              type="button"
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors"
              onClick={() => window.history.back()}
            >
              Cancel
            </button>
            <button 
              type="submit"
              form="add-course-form"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium shadow-sm transition-all disabled:opacity-70"
            >
              <Save size={18} />
              {loading ? 'Saving...' : 'Publish Course'}
            </button>
          </div>
        </div>

        <form id="add-course-form" onSubmit={handleSubmit} className="space-y-6">
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column (General Info) */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Basic Details Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4 text-indigo-600">
                  <BookOpen size={20} />
                  <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
                    <input
                      required
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g. Full-Stack Web Development with MERN"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course Drive Link</label>
                    <input
                      required
                      type="text"
                      name="drive"
                      value={formData.drive}
                      onChange={handleDrive}
                      placeholder="e.g. paste your google drive link here"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Instructor Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 text-gray-400" size={18} />
                        <input
                          required
                          type="text"
                          name="instructor"
                          value={formData.instructor}
                          onChange={handleChange}
                          placeholder="e.g. Sophia Rahman"
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                      <div className="relative">
                        <Layers className="absolute left-3 top-2.5 text-gray-400" size={18} />
                        <select
                          name="level"
                          value={formData.level}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none appearance-none bg-white"
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                          <option value="All Levels">All Levels</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-2.5 text-gray-400" size={18} />
                        <input
                        required
                          type="text"
                          name="duration"
                          value={formData.duration}
                          onChange={handleChange}
                          placeholder="e.g. 45 hours"
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Initial Rating</label>
                      <div className="relative">
                        <Star className="absolute left-3 top-2.5 text-gray-400" size={18} />
                        <input
                          type="number"
                          required
                          step="0.1"
                          max="5"
                          name="rating"
                          value={formData.rating}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Students Enrolled</label>
                      <div className="relative">
                        <Users className="absolute left-3 top-2.5 text-gray-400" size={18} />
                        <input
                        required
                          type="number"
                          name="students"
                          value={formData.students}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4 text-indigo-600">
                  <FileText size={20} />
                  <h2 className="text-lg font-semibold text-gray-900">Course Descriptions</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                    <textarea
                    required
                      name="description"
                      // rows="2"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Brief overview shown on cards..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Description</label>
                    <textarea
                    required
                      name="fullDescription"
                      // rows="6"
                      value={formData.fullDescription}
                      onChange={handleChange}
                      placeholder="Detailed course breakdown..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Curriculum Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-indigo-600">
                    <List size={20} />
                    <h2 className="text-lg font-semibold text-gray-900">Curriculum</h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => addArrayItem('curriculum')}
                    className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
                  >
                    <Plus size={16} /> Add Module
                  </button>
                </div>
                
                <div className="space-y-3">
                  {formData.curriculum.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <div className="flex-1">
                        <input
                          type="text"
                          required
                          value={item}
                          onChange={(e) => handleArrayChange(index, 'curriculum', e.target.value)}
                          placeholder={`Module ${index + 1}`}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeArrayItem(index, 'curriculum')}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        disabled={formData.curriculum.length === 1}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column (Sidebar) */}
            <div className="space-y-6">
              
              {/* Pricing Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4 text-indigo-600">
                  <DollarSign size={20} />
                  <h2 className="text-lg font-semibold text-gray-900">Pricing</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (USD)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-500 font-medium">$</span>
                      <input
                      required
                        type="number"
                        name="priceUSD"
                        value={formData.priceUSD}
                        onChange={handleChange}
                        placeholder="79.99"
                        className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (BDT)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-500 font-medium">৳</span>
                      <input
                        type="number"
                        name="priceBDT"
                        required
                        value={formData.priceBDT}
                        onChange={handleChange}
                        placeholder="8990"
                        className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Media Card (UPDATED) */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4 text-indigo-600">
                  <ImageIcon size={20} />
                  <h2 className="text-lg font-semibold text-gray-900">Course Media</h2>
                </div>
                
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course Thumbnail</label>
                  
                  {!imagePreview ? (
                    <div className="relative w-full h-48 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 hover:border-indigo-400 hover:bg-gray-100 transition-all flex flex-col items-center justify-center cursor-pointer group">
                      <input 
                      required
                        type="file" 
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                      />
                      <div className="p-4 bg-white rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform">
                        <Upload className="text-indigo-600" size={24} />
                      </div>
                      <p className="text-sm font-medium text-gray-700">Click to upload image</p>
                      <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG or GIF (max. 2MB)</p>
                    </div>
                  ) : (
                    <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 group">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          type="button"
                          onClick={removeImage}
                          className="bg-white text-red-600 p-2 rounded-full shadow-lg hover:bg-red-50 transition-colors transform hover:scale-110"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  )}
                  
                </div>
              </div>

              {/* What You'll Learn Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">What You'll Learn</h2>
                  <button
                    type="button"
                    onClick={() => addArrayItem('whatYouLearn')}
                    className="p-1 text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                
                <div className="space-y-2">
                  {formData.whatYouLearn.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                      required
                        type="text"
                        value={item}
                        onChange={(e) => handleArrayChange(index, 'whatYouLearn', e.target.value)}
                        placeholder="Learning outcome..."
                        className="flex-1 px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem(index, 'whatYouLearn')}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        disabled={formData.whatYouLearn.length === 1}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;