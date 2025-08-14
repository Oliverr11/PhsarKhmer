import {
  useDeleteProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
} from "../../features/product/productSlice2";
import { Link, NavLink } from "react-router";
import DataTable from "react-data-table-component";
import { id } from "zod/v4/locales";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { ToastContainer, toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";

export default function Products() {
  const { data, isLoading } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
    }
  };

  const handleDelete2 = (uuid) => {
    setOpenModal(true);
    setdeleteId(uuid);
  };
  const [openModal, setOpenModal] = useState(false);
  const [deleteId, setdeleteId] = useState(null);

  const columns = [
    {
      name: "Thumbnail",
      selector: (row) => (
        <img
          src={row.thumbnail}
          alt={row.name}
          className="w-12 h-12 object-cover rounded"
        />
      ),
    },
    {
      name: "Name",
      selector: (row) => row?.name,
      sortable: true,
    },

    {
      name: "Category",
      selector: (row) => row?.category?.name,
      sortable: true,
    },
    {
      name: "Supplier",
      selector: (row) => row?.supplier?.name,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row?.priceOut + " $",
      sortable: true,
    },
    {
      name: "Stock",
      selector: (row) => row?.stockQuantity,
      sortable: true,
    },
    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <div className="flex gap-1">
          <Link
            to={`/edit/${row.uuid}`}
            className="inline-flex h-[40px] my-5 items-center  text-white rounded-md  bg-emerald-500 transition-colors duration-300 hover:bg-emerald-600   p-2"
          >
            <i class="fa-solid fa-pen-to-square"></i>{" "}
          </Link>
          <Link
            to={`/products/${row.uuid}`}
            className="inline-flex h-[40px] my-5 items-center  text-white rounded-md  bg-blue-500 transition-colors duration-300 hover:bg-blue-600   p-2"
          >
            <i class="fa-solid fa-eye"></i>{" "}
          </Link>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleDelete2(row?.uuid);
            }}
            className="inline-flex h-[40px] my-5 items-center  text-white rounded-md  bg-red-500 transition-colors duration-300 hover:bg-red-600   p-2"
          >
            <i class="fa-solid fa-trash"></i>{" "}
          </button>
        </div>
      ),
    },
  ];

  const customStyles = {
    rows: {
      style: {},
    },
    headCells: {
      style: {
        backgroundColor: "#4CAF50", // Green header
        color: "white",
      },
    },
    cells: {
      style: {},
    },
    pagination: {
      style: {
        borderTop: "1px solid #E5E7EB", // Light gray border
        paddingTop: "10px",
        paddingBottom: "10px",
        backgroundColor: "#F9FAFB", // Light background
      },
      pageButtonsStyle: {
        borderRadius: "5px",
        height: "35px",
        width: "35px",
        padding: "5px",
        margin: "0 5px",
        cursor: "pointer",
        transition: "0.3s",
        backgroundColor: "#fff",
        border: "1px solid #D1D5DB",
        "&:hover": {
          backgroundColor: "#4CAF50",
          color: "white",
        },
        "&:disabled": {
          cursor: "unset",
          color: "#9CA3AF",
        },
      },
    },
  };
  console.log("data from RTK Query", data);

  return (
    <main className="max-w-screen-xl mx-auto container px-10">
      <Link
        to={`/add-product`}
        className="inline-flex h-[40px] my-5 items-center  text-white rounded-md  bg-emerald-500 transition-colors duration-300 hover:bg-emerald-600   p-2"
      >
        <span>Add Product</span>
      </Link>
      <div className="rounded-lg">
        <DataTable
          title="All Products "
          columns={columns}
          data={data?.content}
          pagination
          progressPending={isLoading}
          customStyles={customStyles}
          progressComponent={
            <div className="flex justify-center items-center p-5">
              <ClipLoader size={50} color="#4CAF50" loading={true} />
              <span className="ml-3 text-lg text-gray-600">
                Loading products...
              </span>
            </div>
          }
        />
      </div>

      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
        className=" mt-30  "
      >
        <ModalHeader />
        <ModalBody>
          <div className="text-center  ">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                className="bg-red-500 p-2 rounded-2xl text-white"
                onClick={() => {
                  setOpenModal(false);
                  deleteProduct(deleteId);
                  toast.success("Product deleted successfully!");
                }}
              >
                Yes, I'm sure
              </button>
              <button
                className="bg-blue-500 p-2 rounded-2xl text-white"
                color="alternative"
                onClick={() => setOpenModal(false)}
              >
                No, cancel
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </main>
  );
}
