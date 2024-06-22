import { useEffect, useState } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import HomeTitle from '../Shared/HomeTitle/HomeTitle';


const TopEarners = () => {
  const axiosSecure = useAxiosSecure();
  const [topEarners, setTopEarners] = useState([]);

  useEffect(() => {
    const fetchTopEarners = async () => {
      try {
        const response = await axiosSecure.get('/users'); // Adjust API endpoint as per your backend setup
        const filteredWorkers = response.data.filter(user => user.role === 'worker');
        // Fetch submissions and calculate total amount and count for each worker
        const promises = filteredWorkers.map(async worker => {
            const submissionsResponse = await axiosSecure.get(`/submissions/${worker.email}`);
            const submissions = submissionsResponse.data;
            const totalAmount = submissions.reduce((acc, submission) => parseInt(acc) + parseInt(submission.payable_amount), 0);
            return {
              ...worker,
              totalAmount,
              submissionCount: submissions.length
            };
          });
  
          // Wait for all promises to resolve
          const workersWithStats = await Promise.all(promises);
        const sortedWorkers = workersWithStats.sort((a, b) => b.totalAmount - a.totalAmount);
        setTopEarners(sortedWorkers);
      } catch (error) {
        console.error('Error fetching top earners:', error);
      }
    };

    fetchTopEarners();
  }, [axiosSecure]);

  return (
    <div className="px-20 bg-[#EDE8F5] pb-20">
      <HomeTitle title="Top Earners" para="Portraying Top 6 Workers data who have earned maximum coins. Some of them withdrawed their reward in money form." />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {topEarners.map((worker) => (
          <div key={worker._id} className="p-4 border rounded-lg shadow-md">
            <img src={worker.photo} alt={worker.name} className="w-full h-auto mb-4 rounded-lg" />
            <div className="text-lg font-bold">{worker.name}</div>
            <div className="text-sm text-gray-500 mb-2">{worker.email}</div>
            <div className="text-sm text-gray-700 mb-2">Available Coins: {worker.coins}</div>
            <div className="text-sm text-gray-700 mb-2">Coins Earned: {worker.totalAmount}</div>
            <div className="text-sm text-gray-700 mb-2">Tasks Completed: {worker.submissionCount}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopEarners;
