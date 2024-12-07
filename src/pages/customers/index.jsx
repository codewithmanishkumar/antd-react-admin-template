import { EllipsisOutlined, PlusOutlined } from "@ant-design/icons";
import {
  PageContainer,
  ProTable,
  TableDropdown,
} from "@ant-design/pro-components";
import { Button, Dropdown, Space, Tag } from "antd";
import { getApi } from "api";
import { API_ENDPOINTS } from "api/endpoints";
import { useNavigate } from "react-router";
import { ROUTES } from "router/routes";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    width: 48,
    editable: false,
  },
  {
    title: "Username",
    dataIndex: "firstName",
    copyable: true,
    ellipsis: true,
    tooltip: "The title will be truncated if it is too long.",
    formItemProps: {
      rules: [
        {
          required: true,
          message: "This field is required",
        },
      ],
    },
  },
  {
    disable: true,
    title: "Blood Group",
    dataIndex: "bloodGroup",
    filters: true,
    onFilter: true,
    ellipsis: true,
    valueType: "select",
    valueEnum: {
      b: {
        text: "B+",
        status: "B+",
      },
    },
  },
  {
    disable: true,
    title: "Eye color",
    dataIndex: "eyeColor",
    search: false,
    renderFormItem: (_, { defaultRender }) => {
      return defaultRender(_);
    },
    render: (_, record) => (
      <Space>
        <Tag>{record.eyeColor}</Tag>
      </Space>
    ),
  },
  {
    title: "Date of birth",
    dataIndex: "birthDate",
    valueType: "date",
    sorter: true,
    hideInSearch: true,
  },

  {
    title: "Actions",
    valueType: "option",
    key: "option",
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        Edit
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        View
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: "copy", name: "Copy" },
          { key: "delete", name: "Delete" },
        ]}
      />,
    ],
  },
];

export default () => {
  const navigate = useNavigate();
  const getData = async (params, sort, filter) => {
    console.log(sort, filter, params);
    const response = await getApi(API_ENDPOINTS.CUSTOMERS, {
      limit: params.pageSize,
      skip: (params.current - 1) * params.pageSize,
    });
    return {
      data: response.users,
      page: 1,
      success: true,
      total: response.total,
    };
  };

  return (
    <PageContainer>
      <ProTable
        columns={columns}
        cardBordered
        request={getData}
        editable={{
          type: "multiple",
        }}
        rowSelection
        columnsState={{
          persistenceKey: "admin-table-customers",
          persistenceType: "localStorage",
          defaultValue: {
            option: { fixed: "right", disable: true },
          },
          onChange(value) {
            console.log("value: ", value);
          },
        }}
        rowKey="id"
        search={{
          labelWidth: "auto",
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        form={{
          syncToUrl: (values, type) => {
            if (type === "get") {
              return {
                ...values,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }}
        pagination={{
          pageSize: 10,
        }}
        dateFormatter="string"
        headerTitle="Advanced Table"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => navigate(`${ROUTES.CUSTOMERS}/add`)}
          >
            New
          </Button>,
          <Dropdown
            key="menu"
            menu={{
              items: [
                {
                  label: "1st item",
                  key: "1",
                },
                {
                  label: "2nd item",
                  key: "2",
                },
                {
                  label: "3rd item",
                  key: "3",
                },
              ],
            }}
          >
            <Button>
              <EllipsisOutlined />
            </Button>
          </Dropdown>,
        ]}
      />
    </PageContainer>
  );
};
