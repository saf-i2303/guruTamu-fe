import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import type { Task } from "@/types/task";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Dialog,  DialogClose, DialogContent, DialogFooter,  DialogTitle,  DialogHeader, DialogDescription } from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CreateTaskService, DeleteTaskService, ListTaskServices } from "@/services/task";
import { Trash2 } from "lucide-react";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle,AlertDialogFooter, AlertDialogAction,AlertDialogCancel } from "@/components/ui/alert-dialog";

export default function Dashboard() {
  const [isDialogOpen, setIsDialogFormOpen] = useState<boolean>(false);
  const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [currentTaskId, setCurrentTaskId] = useState<string>("");
 

  const getListTasks = async () => {
    ListTaskServices().then((data) => {
      console.log(data);
      setTasks(data);
    }); 
  }

  useEffect(() => {
    getListTasks();
  }, []);

  const createTask = () => { 
    CreateTaskService({
      title,
      desc: description,
      label: "Todo",
    }).then((success) => {
      if (success) {
        alert("berhasil")
        getListTasks();
      }
    })
  }

  const handleDeleteTask = (Id: string) => {
    setCurrentTaskId(Id);
    setIsDialogDeleteOpen(true);
  }

  const deleteTask =  () => {
    DeleteTaskService(currentTaskId).then((isSuccess) => {
      if (isSuccess) {
        alert("berhasil dihapus")
        getListTasks();
        setIsDialogDeleteOpen(false);
      }
  })
}

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6"></div>
              <Card className="container/card m-16">
                <CardHeader className="border-b flex flex-row">
                  <div>
                    <CardTitle>Task List</CardTitle>
                    <CardDescription>Your current task lists</CardDescription>
                  </div>
                  <Button className="ml-auto my-auto" onClick={() => setIsDialogFormOpen(true)}>Add Task</Button>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-3">
                    {tasks.map((task) => (
                      <li key={task.id} className="flex items-start gap-3">
                        <Checkbox />
                        <div className={cn("text-left flex-1 space-y-0.5")}>
                          <h1 className={cn("font-medium")}>{task.title}</h1>
                          <p className={cn("text-muted-foreground text-sm")}>
                            {task.desc}
                          </p>
                        </div>
                        <Button variant="ghost" className="text-red-500 hover:text-red-700" onClick={() => handleDeleteTask(task.id!)}>
                          <Trash2/>
                        </Button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogDescription>Fill in the details for your new task</DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <Field>
              <Label>Title</Label>
              <Input onChange={(e) => setTitle(e.currentTarget.value)}/>
            </Field>
            <Field>
              <Label>Description</Label>
              <Textarea onChange={(e) => setDescription(e.currentTarget.value)}/>
                    </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
            <Button variant="outline">cancel</Button>
                    </DialogClose>
                    <Button onClick ={() => createTask()}>
                      save changes
                    </Button>
          </DialogFooter>
        </DialogContent>

      </Dialog>

    <AlertDialog open= {isDialogDeleteOpen} onOpenChange={setIsDialogDeleteOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteTask()}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  
      </SidebarInset>
    </SidebarProvider>
  );
}