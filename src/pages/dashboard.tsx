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
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([
    
    {
      id: "1",
      userId: "1",
      label: "design",
      title: "Design onboarding",
      description: "sketch the new onboarding flow",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      userId: "1",
      title: "apalah",
      description: "apa aja dech",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

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
                  <Button className="ml-auto my-auto">Add Task</Button>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-3">
                    {tasks.map((task) => (
                      <li key={task.id} className="flex items-start gap-3">
                        <Checkbox />
                        <div className={cn("text-left flex-1 space-y-0.5")}>
                          <h1 className={cn("font-medium")}>{task.title}</h1>
                          <p className={cn("text-muted-foreground text-sm")}>
                            {task.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}