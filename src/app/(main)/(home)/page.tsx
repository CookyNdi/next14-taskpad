import PageContainer from "@/components/layout/page-container/page-container";
import { GetWorkspaceList } from "@/server/action/workspace/list";
import HomeContent from "./components/content";

export default async function HomePage() {
  const workspace = await GetWorkspaceList();

  return (
    <PageContainer>
      {workspace ? (
        <HomeContent workspace={workspace} />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <h1>Create at least one workspace</h1>
        </div>
      )}
    </PageContainer>
  );
}
