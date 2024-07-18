import PageContainer from "@/components/layout/page-container/page-container";

import { GetWorkspaceById } from "@/server/action/workspace/get-by-id";
import WorkspaceContent from "./_components/content";

type WorkSpacePageProps = {
  params: {
    workspaceId: string;
  };
};

export default async function WorkSpacePage({ params }: WorkSpacePageProps) {
  const workspaceId = params.workspaceId || "";
  const workspace = await GetWorkspaceById(workspaceId);

  return (
    <PageContainer>
      {workspace ? (
        <WorkspaceContent workspace={workspace} />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <h1 className="text-xl font-semibold">Workspace Not Found!</h1>
        </div>
      )}
    </PageContainer>
  );
}
