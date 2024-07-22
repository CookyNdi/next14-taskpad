import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type Workspace } from "@/type/workspace";
import CreateWorkspace from "@/components/dialog/create-workspace";
import Link from "next/link";

type HomeContentProps = {
  workspace: Workspace[];
};

export default function HomeContent({ workspace }: HomeContentProps) {
  return (
    <div className="flex w-full flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Workspace List</h1>
        <CreateWorkspace>
          <Button>Create Workspace</Button>
        </CreateWorkspace>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {workspace.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription
                className="truncate"
                title={item.description ?? "No description"}
              >
                {item.description ?? "No description"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={`/workspace/${item.id}`}>
                <Button variant="outline" className="w-full">
                  Open
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
