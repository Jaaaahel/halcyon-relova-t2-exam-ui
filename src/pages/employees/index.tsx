import { ReactElement, useEffect, useMemo, useState } from "react";
import Layout from "@/components/Layout";
import { Page } from "@/interfaces/page";
import { Employee } from "@/interfaces/employee";
import api, { isAxiosError } from "@/api";

const Index: Page = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    api.get<Employee[]>("/employees").then(({ data }) => setEmployees(data));
  }, []);

  const deleteEmployee = async (id: number) => {
    try {
      await api.delete(`/employees/${id}`);

      setEmployees(employees.filter((employee) => employee.id !== id));
    } catch (error: any) {
      if (isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-between">
        <div>
          <p className="text-2xl mb-4">Employee List</p>
        </div>
        <div>
          <a href={`/employees/add`} className="button">
            Add New Employee
          </a>
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Full Name
              </th>
              <th scope="col" className="px-6 py-3">
                Department
              </th>
              <th scope="col" className="px-6 py-3">
                Position
              </th>
              <th scope="col" className="px-6 py-3">
                Employment Type
              </th>
              <th scope="col" className="px-6 py-3">
                Date Hired
              </th>
              <th scope="col" className="px-6 py-3">
                Created At
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, i) => (
              <tr className="border-b odd:bg-white even:bg-gray-50" key={i}>
                <td className="px-6 py-4">{employee.id}</td>
                <td className="px-6 py-4">
                  {employee.firstName} {employee.lastName}
                </td>
                <td className="px-6 py-4">{employee.department}</td>
                <td className="px-6 py-4">{employee.position}</td>
                <td className="px-6 py-4">{employee.employmentStatus}</td>
                <td className="px-6 py-4">{employee.dateHired.toString()}</td>
                <td className="px-6 py-4">{employee.maritalStatus}</td>
                <td className="px-6 py-4">
                  <a
                    href={`/employees/${employee?.id}`}
                    className="font-medium text-blue-600 hover:underline mr-4"
                  >
                    View
                  </a>
                  <a
                    href={`/employees/${employee?.id}/edit`}
                    className="font-medium text-blue-600 hover:underline mr-4"
                  >
                    Edit
                  </a>
                  <a
                    href="#"
                    className="font-medium text-blue-600 hover:underline mr-4"
                    onClick={() => deleteEmployee(employee?.id)}
                  >
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Index.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Index;
