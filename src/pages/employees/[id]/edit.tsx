import api, { FieldError, isAxiosError } from "@/api";
import Layout from "@/components/Layout";
import { Employee } from "@/interfaces/employee";
import { Page } from "@/interfaces/page";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Edit: Page = () => {
  const router = useRouter();
  const [employee, setEmployee] = useState<Employee>();

  const { id } = router.query;

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<Employee>({ defaultValues: employee });

  useEffect(() => {
    if (id) {
      api
        .get<Employee>(`/employees/${id}`)
        .then(({ data }) => setEmployee(data));
    }
  }, [id]);

  useEffect(() => {
    if (employee) {
      Object.keys(employee).forEach((key) => {
        const name = key as keyof Employee;

        setValue(name, employee[name]);
      });
    }
  }, [employee]);

  const onSubmit = async (data: Employee) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to save the changes on this employee?"
    );

    if (!isConfirmed) {
      return;
    }

    try {
      await api.patch(`/employees/${id}`, data);

      router.push(`/employees/${id}`);
    } catch (error: any) {
      if (isAxiosError(error)) {
        if (error.response?.status === 422) {
          const errors: FieldError[] = error.response?.data || [];

          errors.forEach((error) =>
            setError(error.field as keyof Employee, { message: error.message })
          );
        }
      }
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <p className="text-2xl mb-4">Edit Employee Details</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid xl:grid-cols-2 xl:gap-6">
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="text"
              id="floating_first_name"
              className="input peer"
              placeholder=" "
              {...register("firstName", {
                required: "First Name cannot be empty",
              })}
            />
            <label htmlFor="floating_first_name" className="label">
              First Name
            </label>
            {errors.firstName && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div className="relative z-0 mb-6 w-full group">
            <input
              type="text"
              id="floating_last_name"
              className="input peer"
              placeholder=" "
              {...register("lastName", {
                required: "Last Name cannot be empty",
              })}
            />
            <label htmlFor="floating_last_name" className="label">
              Last Name
            </label>
            {errors.lastName && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.lastName.message}
              </p>
            )}
          </div>

          <div className="relative z-0 mb-6 w-full group">
            <input
              type="date"
              id="floating_birth_date"
              className="input peer"
              placeholder=" "
              {...register("birthDate", {
                required: "Birth Date cannot be empty",
              })}
            />
            <label htmlFor="floating_birth_date" className="label">
              Birth Date
            </label>
            {errors.birthDate && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.birthDate.message}
              </p>
            )}
          </div>

          <div className="relative z-0 mb-6 w-full group">
            <input
              type="text"
              id="floating_contact_number"
              className="input peer"
              placeholder=" "
              {...register("contactNumber", {
                required: "Contact Number cannot be empty",
              })}
            />
            <label htmlFor="floating_contact_number" className="label">
              Contact Number
            </label>
            {errors.contactNumber && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.contactNumber.message}
              </p>
            )}
          </div>

          <div className="relative z-0 mb-6 w-full group">
            <label
              htmlFor="gender"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Gender
            </label>
            <select
              id="gender"
              className="select"
              {...register("gender", { required: true })}
            >
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>

          <div className="relative z-0 mb-6 w-full group">
            <label
              htmlFor="maritalStatus"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Marital Status
            </label>
            <select
              id="maritalStatus"
              className="select"
              {...register("maritalStatus", { required: true })}
            >
              <option>Single</option>
              <option>Married</option>
              <option>Widowed</option>
              <option>Divorced</option>
            </select>
          </div>

          <div className="relative z-0 mb-6 w-full group">
            <label
              htmlFor="department"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Department
            </label>
            <select
              id="department"
              className="select"
              {...register("department", { required: true })}
            >
              <option>Admin</option>
              <option>Engineering</option>
              <option>Finance</option>
            </select>
          </div>

          <div className="relative z-0 mb-6 w-full group">
            <label
              htmlFor="employmentStatus"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Employment Status
            </label>
            <select
              id="employmentStatus"
              className="select"
              {...register("employmentStatus", { required: true })}
            >
              <option>Casual</option>
              <option>Probationary</option>
              <option>Regular</option>
            </select>
          </div>

          <div className="relative z-0 mb-6 w-full group">
            <input
              type="text"
              id="floating_position"
              className="input peer"
              placeholder=" "
              {...register("position", {
                required: "Position cannot be empty",
              })}
            />
            <label htmlFor="floating_position" className="label">
              Position
            </label>
            {errors.position && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.position.message}
              </p>
            )}
          </div>

          <div className="relative z-0 mb-6 w-full group">
            <input
              type="date"
              id="floating_date_hired"
              className="input peer"
              placeholder=" "
              {...register("dateHired", {
                required: "Date Hired cannot be empty",
              })}
            />
            <label htmlFor="floating_date_hired" className="label">
              Date Hired
            </label>
            {errors.dateHired && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.dateHired.message}
              </p>
            )}
          </div>

          <div className="relative z-0 mb-6 w-full group">
            <input
              type="text"
              id="floating_email"
              className="input peer"
              placeholder=" "
              {...register("email")}
            />
            <label htmlFor="floating_email" className="label">
              Email
            </label>
          </div>

          <div className="relative z-0 mb-6 w-full group">
            <input
              type="text"
              id="floating_address"
              className="input peer"
              placeholder=" "
              {...register("address")}
            />
            <label htmlFor="floating_address" className="label">
              Address
            </label>
          </div>

          <div className="relative z-0 mb-6 w-full group">
            <input
              type="text"
              id="floating_city"
              className="input peer"
              placeholder=" "
              {...register("city")}
            />
            <label htmlFor="floating_city" className="label">
              City
            </label>
          </div>

          <div className="relative z-0 mb-6 w-full group">
            <input
              type="text"
              id="floating_province"
              className="input peer"
              placeholder=" "
              {...register("province")}
            />
            <label htmlFor="floating_province" className="label">
              Province
            </label>
          </div>

          <div className="relative z-0 mb-6 w-full group">
            <input
              type="text"
              id="floating_nationality"
              className="input peer"
              placeholder=" "
              {...register("nationality")}
            />
            <label htmlFor="floating_nationality" className="label">
              Nationality
            </label>
          </div>
          <div></div>

          <button className="cancel-button">Cancel</button>
          <button type="submit" className="button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

Edit.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Edit;
