import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

export default function SocialLogin() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          Another Option
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Another Option</DialogTitle>
        </DialogHeader>
        <Button>
          <div className="flex items-center gap-x-2">
            <FcGoogle size={20} /> Google
          </div>
        </Button>
        <Button>
          <div className="flex items-center gap-x-2">
            <FaGithub size={20} /> Github
          </div>
        </Button>
      </DialogContent>
    </Dialog>
  );
}
