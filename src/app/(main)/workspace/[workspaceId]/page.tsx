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
        <h1>Workspace Not Found!</h1>
      )}
    </PageContainer>
  );
}
