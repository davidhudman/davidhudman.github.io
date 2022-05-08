import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const App3 = () => {
  const formik = useFormik({
    initialValues: {
      invoiceAmount: "",
      tipAmount: "",
      description: "",
    },
    validationSchema: Yup.object({
      invoiceAmount: Yup.number().required("Required"),
      tipAmount: Yup.number(),
      description: Yup.string(),
    }),
    onSubmit: (values) => {
      console.log(JSON.stringify(values));
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="invoiceAmount">Invoice Amount</label>
        <input
          id="invoiceAmount"
          name="invoiceAmount"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.invoiceAmount}
        />
        {formik.touched.invoiceAmount && formik.errors.invoiceAmount ? (
          <div>{formik.errors.invoiceAmount}</div>
        ) : null}

        <label htmlFor="tipAmount">Tip Amount</label>
        <input
          id="tipAmount"
          name="tipAmount"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.tipAmount}
        />
        {formik.touched.tipAmount && formik.errors.tipAmount ? (
          <div>{formik.errors.tipAmount}</div>
        ) : null}

        <label htmlFor="description">Description</label>
        <input
          id="description"
          name="description"
          type="description"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
        />
        {formik.touched.description && formik.errors.description ? (
          <div>{formik.errors.description}</div>
        ) : null}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App3;
