import { useCallback } from 'react';
import Swal from 'sweetalert2';
import useAxiosPublic from './useAxiosPublic';

const useDeleteReport = (refetch) => {
    const axiosPublic = useAxiosPublic();
  const handleDeleteReport = useCallback((id) => {
    console.log("🚀 ~ handleDeleteReport ~ id:", id)
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosPublic.delete(`/reportData/${id}`);
          console.log("🚀 ~ handleDelete ~ res:", res.data);
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              icon: "success",
              title: "Item Deleted Successfully!",
              showConfirmButton: false,
              timer: 1500
            });
          }
        } catch (error) {
          console.error('Error deleting report:', error);
          Swal.fire({
            icon: "error",
            title: "Error deleting report",
            text: error.message,
            showConfirmButton: true
          });
        }
      }
    });
  }, [refetch]);

  return handleDeleteReport;
};

export default useDeleteReport;
