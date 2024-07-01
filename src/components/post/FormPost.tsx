'use client'

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { createPost } from "@/services/post.service"
import { useMutation, useQueryClient,useQuery } from "@tanstack/react-query"
import { fetchAllCategories } from "@/services/category.service";
import { useRef } from "react"

type FormPostProps = {
    setOpen: (open: boolean) => void;
}

const FormPost = ({ setOpen } : FormPostProps) => {
    const queryClient = useQueryClient();
    const { isPending, error, data } = useQuery({
        queryKey: ['getAllCategories'],
        queryFn: fetchAllCategories
    })


    const mutation = useMutation({
        mutationFn: createPost,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['getAllPosts']
            })
            setOpen(false);
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const createPostDTO = {
            title: e.target.title.value,
            description: e.target.description.value,
        }
        if (e.target.category.value) {
            createPostDTO.category = e.target.category.value;
        }
        
        if(createPostDTO.title){
            mutation.mutate(createPostDTO);
        }
        
    }
    const selectRef = useRef<HTMLSelectElement>(null)
    if(isPending) return <div className="h-full flex justify-center items-center">Loading...</div>
    return ( 
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
                <Input 
                    type="text" 
                    placeholder="Titre du post" 
                    name="title"
                />
            </div>
            <div>
                <select className="px-4 py-3 border border-slate-200 rounded-lg" name="category" id="">
                    <option value="">Choisir une catégorie</option>
                    {data?.map((category: any) => (
                        <option className="px-4 py-12" key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <Textarea 
                    placeholder="Description du post"
                    name="description"
                />
            </div>
            <div>
                <Button type="submit" className="w-full" disabled={mutation.isPending}>
                    {mutation.isPending && <span className="mr-4 h-4 w-4 rounded-full bg-white animate-pulse"></span>}
                    Créer la publication
                </Button>
            </div>
        </form>
     );
}
 
export default FormPost;