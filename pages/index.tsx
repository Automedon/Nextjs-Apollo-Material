import React from "react";
import MaterialTable, { Column } from "material-table";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { ALL_USERS_QUERY } from "../graphql/query";
import {
  DELETE_USER_MUTATION,
  UPDATE_USER_MUTATION,
  CREATE_USER_MUTATION,
} from "../graphql/mutation";

interface Row {
  id: string;
  name: string;
  email: string;
}

export default function index() {
  const { data, loading } = useQuery(ALL_USERS_QUERY);
  const [deleteUser] = useMutation(DELETE_USER_MUTATION, {
    refetchQueries: [{ query: ALL_USERS_QUERY }],
    awaitRefetchQueries: true,
  });
  const [updateUser] = useMutation(UPDATE_USER_MUTATION, {
    refetchQueries: [{ query: ALL_USERS_QUERY }],
    awaitRefetchQueries: true,
  });
  const [createUser] = useMutation(CREATE_USER_MUTATION, {
    refetchQueries: [{ query: ALL_USERS_QUERY }],
    awaitRefetchQueries: true,
  });
  const columns: Array<Column<Row>> = [
    {
      title: "Email",
      field: "email",
    },
    {
      title: "Name",
      field: "name",
    },
  ];

  if (loading) {
    return <h4>Fetching...</h4>;
  }
  return (
    <MaterialTable
      title={
        <h2>
          <a href="https://github.com/Automedon">Automedon</a>
        </h2>
      }
      columns={columns}
      data={data.users}
      detailPanel={[
        {
          tooltip: "Show ID",
          render: (rowData) => {
            return (
              <div
                style={{
                  fontSize: 20,
                  textAlign: "center",
                  color: "black",
                  backgroundColor: "#f9fff9",
                }}
              >
                ID:{rowData.id}(This is a kind details of user)
              </div>
            );
          },
        },
      ]}
      editable={{
        onRowAdd: async (newData) => {
          await createUser({
            variables: {
              input: {
                email: newData.email,
                name: newData.name,
              },
            },
          });
        },
        onRowUpdate: async (newData, oldData) => {
          await updateUser({
            variables: {
              id: oldData.id,
              input: {
                email: newData.email,
                name: newData.name,
              },
            },
          });
        },
        onRowDelete: async (oldData) => {
          await deleteUser({
            variables: {
              id: oldData.id,
            },
          });
        },
      }}
    />
  );
}
