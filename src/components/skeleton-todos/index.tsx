import { Skeleton } from "../ui/skeleton";

const SkeletonTodos = () => {
    return (
        <div className="flex flex-col justify-center items-center w-full space-y-4">
            {Array.from({length: 6}).map(() => <Skeleton className="bg-primary/40 w-full p-8 rounded-lg flex justify-between items-center" />)}
        </div>
    );
}

export default SkeletonTodos;