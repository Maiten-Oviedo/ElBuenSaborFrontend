"use client";
import React, { useEffect } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { MyFormProps } from "@/common/types/form.types";
import { useRouter } from "next/navigation";
import Button from "../button/Button";

function MyForm<TValues extends object>({
  initialValues,
  validationSchema,
  loading = false,
  error: err,
  children,
  onSubmit,
  leftButton = true,
  fields,
  onFormChange,
  textButton = "Enviar",
  typeButton = "submit",
  textLeftButton = "Cancelar",
  onButtonClick = () => {},
  onLeftButtonClick,
  designInOneColumn = false,
}: MyFormProps<TValues>) {
  const router = useRouter();

  return (
    <Formik<TValues>
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={onSubmit}
    >
      {(formikHelpers) => {
        const { errors, touched } = formikHelpers;
        useEffect(() => {
          if (onFormChange) {
            onFormChange(formikHelpers.values);
          }
        }, [formikHelpers.values]);
        return (
          <Form
            className={`w-full ${
              designInOneColumn
                ? "flex flex-col gap-2 items-center"
                : "grid grid-cols-2 items-end gap-6"
            } `}
          >
            {fields.map((field, index) => {
              const {
                name,
                label,
                type,
                id,
                placeholder,
                className: fieldClassName,
                options,
              } = field;

              return (
                <div
                  key={name}
                  className={`${
                    (fields.length === 1 ||
                      (fields.length % 2 === 1 &&
                        index === fields.length - 1)) &&
                    !designInOneColumn
                      ? " flex justify-center"
                      : "flex flex-col w-full items-center"
                  }`}
                >
                  <div className="flex flex-col w-full max-w-md">
                    <label htmlFor={id ?? name} className="text-white">
                      {label}:
                    </label>

                    {type === "select" ? (
                      <>
                        <Field
                          as="select"
                          id={id ?? name}
                          name={name}
                          className={`mb-4 rounded-full p-2 bg-white text-black ${
                            errors[name as keyof TValues] &&
                            touched[name as keyof TValues]
                              ? "border-red-500 border-2"
                              : "border-gray-300"
                          } ${fieldClassName}`}
                        >
                          <option disabled value="">
                            Seleccionar
                          </option>
                          {options?.map((option, index) => (
                            <option
                              key={index}
                              value={option.value}
                              className="text-zinc-900"
                            >
                              {option.label}
                            </option>
                          ))}
                        </Field>
                      </>
                    ) : type === "checkbox" ? (
                      <div>
                        <label
                          htmlFor={id ?? name}
                          className="flex items-center gap-2 mb-4 rounded-full p-2 text-black bg-white text-base"
                        >
                          <Field
                            id={id ?? name}
                            name={name}
                            type="checkbox"
                            className={`w-5 h-5 ${fieldClassName}`}
                          />

                          {label === "Estado"
                            ? "Activo"
                            : label === "¿Es Vendible?"
                            ? "Vendible"
                            : "Estado"}
                        </label>
                      </div>
                    ) : (
                      <>
                        <Field
                          id={id ?? name}
                          name={name}
                          type={type}
                          placeholder={placeholder}
                          className={`mb-4 rounded-full p-2 bg-white text-black ${
                            errors[name as keyof TValues] &&
                            touched[name as keyof TValues]
                              ? "border-red-500 border-2"
                              : ""
                          } ${fieldClassName}`}
                        />
                      </>
                    )}

                    <ErrorMessage
                      name={name}
                      component="div"
                      className="text-red-500 w-full text-sm text-center font-semibold"
                    />
                  </div>
                </div>
              );
            })}

            {children && (
              <div className="mt-6">
                {typeof children === "function"
                  ? children(formikHelpers)
                  : children}
              </div>
            )}
            {err && (
              <p className="col-span-2  bg-red text-center font-bold p-1 ">
                {err}
              </p>
            )}

            <div className="flex justify-around items-center col-span-2 w-full">
              {!loading && leftButton && (
                <Button
                  onClick={onLeftButtonClick ?? (() => router.back())}
                  className="bg-white text-red hover:bg-gray-300"
                >
                  {textLeftButton}
                </Button>
              )}
              <Button
                type={typeButton}
                onClick={() => {
                  if (typeButton !== "submit") {
                    onButtonClick?.(formikHelpers, formikHelpers.values);
                  }
                }}
                className="bg-red text-white hover:bg-red-950"
              >
                {loading ? "Cargando..." : textButton}
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default MyForm;
