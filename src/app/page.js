import { NoteCard } from "@/components/noteCard";
import { NoteForm } from "@/components/noteForm";
import { prisma } from "@/utils/prisma";

export default async function Home() {
  const Products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      userId: true,
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <main className="max-w-2xl m-auto py-12 space-y-4">
      <div className="grid grid-cols-4 gap-4">
        {Products.map((product) => {
          return (
            <div key={product.id} className="space-y-4">
              <div className="w-full h-48 bg-slate-200 rounded-xl">
                <div className="space-y-1">
                  <div>{product.name}</div>
                  <div className="text-sm text-slate-500">
                    {product.user.name}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
