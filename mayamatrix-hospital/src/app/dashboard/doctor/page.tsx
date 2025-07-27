// doctor dashboard page
"use client";
import MaxWidth from "@/components/templates/max-width";
import { useAuthContext } from "@/components/templates/providers";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
// Hardcoded values just for decorative purposes
const appointments = [
  { id: 1, name: "Karishma Aryal", time: "10:00 AM", reason: "Check-up" },
  { id: 2, name: "Savyata Aryal", time: "11:30 AM", reason: "Flu symptoms" },
  { id: 3, name: "Steve Rogers", time: "01:00 PM", reason: "Consultation" },
];

function DoctorDashboard() {
  const { roles, username } = useAuthContext();
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setisLoading(false);
    }, 3000);
    return () => clearTimeout(timeOut);
  }, []);
  if (!roles || !roles?.includes("doctor")) {
    return (
      <div className="flex-1 h-full w-full flex justify-center items-center">
        <p>{isLoading ? "Loading..." : "Unauthorized"}</p>
      </div>
    );
  }

  return (
    <MaxWidth>
      <section
        id="top"
        className=" max-w-6xl mx-auto px-4  flex-col mt-6 sm:mt-12"
      >
        <h1 className="text-7xl font-semibold  ">Welcome {username}</h1>
        <p className="my-4 text-2xl font-semibold">Lets cure people</p>
      </section>
      <section className="mt-16">
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Today's Appointments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {appointments.map((appt) => (
              <div
                key={appt.id}
                className="flex items-center justify-between border-b pb-3 last:border-none last:pb-0"
              >
                <div>
                  <p className="font-medium">{appt.name}</p>
                  <p className="text-sm text-muted-foreground">{appt.reason}</p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="outline">{appt.time}</Badge>
                  <Button size="sm" variant="ghost">
                    Details
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </MaxWidth>
  );
}

export default DoctorDashboard;
