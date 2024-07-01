'use client'

import DialogConfirmDelete from "@/components/globals/DialogConfirmDelete";
import { useToast } from "@/components/ui/use-toast";
import { deleteCategory, fetchCategoryById } from "@/services/category.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";

type CategoryDetailParams = {
    id: string;
}

const CategoryDetail = () => {
    const { id } = useParams<CategoryDetailParams>();
    const router = useRouter();
    const { toast } = useToast()
    let isData = false

    const { isPending, error, data } = useQuery({
        queryKey: ['repoData'],
        queryFn: () => fetchCategoryById(id)
    })

    const mutation = useMutation({
        mutationFn: deleteCategory,
        onSuccess: () => {
            toast({
                title: 'Catégorie supprimé',
                description: 'La catégorie a bien été supprimé',
            })
            router.push('/categories')
        }
    });

    const handleDelete = () => {
        mutation.mutate(id);
    }

    if(isPending) return <div className="h-full flex justify-center items-center">Loading...</div>
    
    if(data.posts.length > 0){
        isData = true
    }
    return ( 
        <div>
            <h1>{data.name}</h1>

            <DialogConfirmDelete 
                handleDelete={handleDelete} 
                isPending={mutation.isPending}
                isDisable={isData}
            />
        </div>
     );
}
 
export default CategoryDetail;