import { useQuery } from "@tanstack/react-query";
import { getBookmarkedPlants } from "../services/bookmarkService";
import { useGetUserProfile } from "./useGetUserProfile";

const useGetBookmarkedPlants = () => {
    const { data: user } = useGetUserProfile();

    return useQuery({
        queryKey: ["bookmarkedPlants"],
        queryFn: () => {
            if(!user){
                throw new Error('No User!');
            }

            return getBookmarkedPlants(user.uid);
        },
        enabled: !!user,
    });
};

export default useGetBookmarkedPlants;
