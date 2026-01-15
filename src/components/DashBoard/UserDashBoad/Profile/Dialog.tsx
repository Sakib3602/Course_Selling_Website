import { FramerModal, ModalContent } from '@/../components/uilayouts/dialog';
import { AuthContext } from '@/components/Authentication_Work/AuthProvider/AuthProvider';
import useAxiosPrivate from '@/url/useAxiosPrivate';
import { useMutation } from '@tanstack/react-query';
import { useContext, useState } from 'react';

type FormValues = {
  name: string;
  phone: string;
  address: string;
};
const Dialog = () => {
  const auth = useContext(AuthContext)
  if (!auth) {
    throw new Error("AuthContext is undefined");
  }   
  const { person } = auth;
  const [modalOpen, setModalOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormValues(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Profile form submitted:', formValues);
    mutationup.mutate(formValues);
    setModalOpen(false);
  };

  const axisSec = useAxiosPrivate()
  // /updateUser/:email
  const mutationup = useMutation({
    mutationFn: async(d: FormValues)=>{
      const res = await axisSec.patch(`/updateUser/${person?.email}`, d);
      return res.data;
    },
    onSuccess : ()=>{
      alert('Profile updated successfully!');
    }
  })

  return (
    <div className=' h-full flex justify-center items-center'>
      <button
        onClick={() => setModalOpen(true)}
        className='i h-12  rounded-md border-2 dark:border-[#656fe2] border-[#c0c6fc]  bg-black sm:w-full dark:hover:border-white px-6 font-medium text-white dark:text-white transition-colors focus:outline-hidden focus:ring-2 dark:focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50'
      >
        Edit Profile
      </button>

      <FramerModal open={modalOpen} setOpen={setModalOpen}>
        <ModalContent>
          <div className='flex flex-col space-y-1.5 text-center sm:text-left'>
            <h2 className='text-lg font-semibold leading-none tracking-tight'>
              Edit profile
            </h2>
            <p className='text-sm text-muted-foreground'>
              Make changes to your profile here. Click save when you're done.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <label className='text-sm font-medium leading-none text-right'>
                Name
              </label>
              <input
                className='flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 col-span-3'
                id='name'
                placeholder='Lionel Andrés Messi Cuccitini'
                value={formValues.name}
                onChange={handleChange}
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <label className='text-sm font-medium leading-none text-right'>
                phone
              </label>
              <input
                className='flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 col-span-3'
                id='phone'
                placeholder='*** **** **** **'
                value={formValues.phone}
                onChange={handleChange}
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <label className='text-sm font-medium leading-none text-right'>
                Address
              </label>
              <input
                className='flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 col-span-3'
                id='address'
                placeholder='Enter your address'
                value={formValues.address}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='mt-4'>
            <button
              className='w-full p-3 bg-black dark:bg-white text-white dark:text-black rounded-md'
              type='submit'
            >
              Save changes
            </button>
          </div>
          </form>
        </ModalContent>
      </FramerModal>
    </div>
  );
};

export default Dialog;
