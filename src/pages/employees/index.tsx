import {
  MouseEvent,
  MouseEventHandler,
  ReactElement,
  useEffect,
  useState,
} from "react";
import Layout from "@/components/Layout";
import { Page } from "@/interfaces/page";
import { Employee } from "@/interfaces/employee";
import api, { isAxiosError } from "@/api";
import { Paginated } from "@/interfaces/pagination";
import Avatar from "@/components/Avatar";

const Index: Page = () => {
  const [paginatedEmployees, setPaginatedEmployees] =
    useState<Paginated<Employee>>();
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    api
      .get<Paginated<Employee>>("/employees", {
        params: {
          page,
        },
      })
      .then(({ data }) => setPaginatedEmployees(data));
  }, [page]);

  useEffect(() => {
    if (paginatedEmployees) {
      setTotalPages(
        Math.round(
          paginatedEmployees.meta.total / paginatedEmployees.meta.per_page
        )
      );
    }
  }, [paginatedEmployees]);

  const previous = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (page > 1) {
      setPage(page - 1);
    }
  };

  const next = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const setCurrentPage = (
    e: MouseEvent<HTMLAnchorElement>,
    currentPage: number
  ) => {
    e.preventDefault();

    setPage(currentPage);
  };

  const deleteEmployee = async (id: number) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!isConfirmed) {
      return;
    }

    try {
      await api.delete(`/employees/${id}`);

      if (paginatedEmployees) {
        const updatedEmployees = paginatedEmployees.data.filter(
          (employee) => employee.id !== id
        );

        setPaginatedEmployees({
          ...paginatedEmployees,
          data: updatedEmployees,
        });
      }
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

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-4">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Avatar
              </th>
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
            {(!paginatedEmployees || paginatedEmployees?.data.length === 0) && (
              <tr className="border-b odd:bg-white even:bg-gray-50">
                <td className="px-6 py-4" colSpan={9}>
                  No Data
                </td>
              </tr>
            )}

            {paginatedEmployees?.data.map((employee, i) => (
              <tr className="border-b odd:bg-white even:bg-gray-50" key={i}>
                <td className="px-6 py-4">
                  <Avatar url={employee.avatar} />
                </td>
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

      <nav aria-label="Page navigation example">
        <ul className="inline-flex items-center -space-x-px">
          <li>
            <a
              href="#"
              className="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              onClick={previous}
            >
              <span className="sr-only">Previous</span>
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
          </li>
          {new Array(totalPages).fill(null).map((_, index) => (
            <li key={index}>
              <a
                href="#"
                className={`page-button ${page === index + 1 ? "active" : ""}`}
                onClick={(e) => setCurrentPage(e, index + 1)}
              >
                {index + 1}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#"
              className="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              onClick={next}
            >
              <span className="sr-only">Next</span>
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

Index.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Index;
