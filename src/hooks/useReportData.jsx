import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

function useReportData() {
  const axiosPublic = useAxiosPublic();
  const {data: reportData, isLoading: isReportLoading, refetch} = useQuery({
    queryKey: ["reportData"],
    queryFn: async() => {
        const res = await axiosPublic.get("/data.json");
        return res.data;
    }
  })
  return [reportData, isReportLoading, refetch];
}

export default useReportData
