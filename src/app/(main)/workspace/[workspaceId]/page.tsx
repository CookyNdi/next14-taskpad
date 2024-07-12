import PageContainer from "@/components/layout/page-container/page-container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { boardData } from "@/lib/temporary-data";

export default function WorkSpacePage() {
  return (
    <PageContainer>
      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2 pb-20">
        {boardData.map((data) => (
          <Card className="h-[320px] space-y-2 p-4" key={data.id}>
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold">{data.title}</h1>
              {/* <Button size="sm">Expand</Button> */}
            </div>
            <ScrollArea className="mt-2 h-[calc(100%-56px)]">
              <div className="flex flex-col gap-y-2 px-3">
                {data.Tasks.map((item) => (
                  <Button key={item.id} className="w-full" variant="outline">
                    {item.title}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}
