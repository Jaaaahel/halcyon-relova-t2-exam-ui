import api from "@/api";
import Layout from "@/components/Layout";
import { Employee } from "@/interfaces/employee";
import { Page } from "@/interfaces/page";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";

const View: Page = () => {
  const router = useRouter();
  const [employee, setEmployee] = useState<Employee>();

  const { id } = router.query;

  useEffect(() => {
    if (id) {
      api
        .get<Employee>(`/employees/${id}`)
        .then(({ data }) => setEmployee(data));
    }
  }, [id]);

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-between">
        <div>
          <p className="text-2xl mb-4">Employee Details</p>
        </div>
        <div>
          <a className="mr-4 button" href={`/employees/${employee?.id}/edit`}>
            Edit Employee
          </a>
          <a className="button" href={`/employees/add`}>
            Add New Employee
          </a>
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <tbody>
            <tr className="border-b odd:bg-white even:bg-gray-50">
              <td className="px-6 py-4">ID</td>
              <td className="px-6 py-4">{employee?.id}</td>
            </tr>
            <tr className="border-b odd:bg-white even:bg-gray-50">
              <td className="px-6 py-4">First Name</td>
              <td className="px-6 py-4">{employee?.firstName}</td>
            </tr>
            <tr className="border-b odd:bg-white even:bg-gray-50">
              <td className="px-6 py-4">Last Name</td>
              <td className="px-6 py-4">{employee?.lastName}</td>
            </tr>
            <tr className="border-b odd:bg-white even:bg-gray-50">
              <td className="px-6 py-4">Gender</td>
              <td className="px-6 py-4">{employee?.gender}</td>
            </tr>
            <tr className="border-b odd:bg-white even:bg-gray-50">
              <td className="px-6 py-4">Birth Date</td>
              <td className="px-6 py-4">{employee?.birthDate.toString()}</td>
            </tr>
            <tr className="border-b odd:bg-white even:bg-gray-50">
              <td className="px-6 py-4">Marital Status</td>
              <td className="px-6 py-4">{employee?.maritalStatus}</td>
            </tr>
            <tr className="border-b odd:bg-white even:bg-gray-50">
              <td className="px-6 py-4">Department</td>
              <td className="px-6 py-4">{employee?.department}</td>
            </tr>
            <tr className="border-b odd:bg-white even:bg-gray-50">
              <td className="px-6 py-4">Position</td>
              <td className="px-6 py-4">{employee?.position}</td>
            </tr>
            <tr className="border-b odd:bg-white even:bg-gray-50">
              <td className="px-6 py-4">Date Hired</td>
              <td className="px-6 py-4">{employee?.dateHired.toString()}</td>
            </tr>
            <tr className="border-b odd:bg-white even:bg-gray-50">
              <td className="px-6 py-4">Employment Status</td>
              <td className="px-6 py-4">{employee?.employmentStatus}</td>
            </tr>
            <tr className="border-b odd:bg-white even:bg-gray-50">
              <td className="px-6 py-4">Contact Number</td>
              <td className="px-6 py-4">{employee?.contactNumber}</td>
            </tr>
            <tr className="border-b odd:bg-white even:bg-gray-50">
              <td className="px-6 py-4">Email</td>
              <td className="px-6 py-4">{employee?.email}</td>
            </tr>
            <tr className="border-b odd:bg-white even:bg-gray-50">
              <td className="px-6 py-4">Address</td>
              <td className="px-6 py-4">{employee?.address}</td>
            </tr>
            <tr className="border-b odd:bg-white even:bg-gray-50">
              <td className="px-6 py-4">City</td>
              <td className="px-6 py-4">{employee?.city}</td>
            </tr>
            <tr className="border-b odd:bg-white even:bg-gray-50">
              <td className="px-6 py-4">Province</td>
              <td className="px-6 py-4">{employee?.province}</td>
            </tr>
            <tr className="border-b odd:bg-white even:bg-gray-50">
              <td className="px-6 py-4">Nationality</td>
              <td className="px-6 py-4">{employee?.nationality}</td>
            </tr>
            <tr className="border-b odd:bg-white even:bg-gray-50">
              <td className="px-6 py-4">Created At</td>
              <td className="px-6 py-4">{employee?.createdAt.toString()}</td>
            </tr>
            <tr className="border-b odd:bg-white even:bg-gray-50">
              <td className="px-6 py-4">Updated At</td>
              <td className="px-6 py-4">{employee?.updatedAt.toString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

View.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default View;
