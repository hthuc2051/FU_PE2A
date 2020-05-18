import * as Constant from './../../../constants/AppConstants';

export default class ScriptJava {
  constructor() {
  };
  GLOBAL_VARIABLE=
  {
      label: Constant.LABEL_PARAM,
      parentId: 39,
      name: 'Global Variable',
      showChildren: true,
      editMode: false,
      children: [
          {
              label: Constant.LABEL_PARAM,
              parentId: 50,
              type: 'String',
              name: 'String',
              value: 'value',
              showChildren: false,
              editMode: false,
              code: '',
              children: [],
          }
      ],
      code: 'String String = "value";',
  }
  DEFAULT = {
    methodName: Constant.METHOD_NAME,
    template: 'Default',
    params: [
      {
        parentId: 39,
        name: "Step",
        label: "Step",
        showChildren: true,
        editMode: false,
        children: [
          {
            label: "Step",
            name: "Println",
            params: [
              {
                id: 3,
                name: "$paramValue",
                type: "String",
                value: "Hello World"
              }
            ],
            showChildren: false,
            editMode: false,
            code: "System.out.println(\"Hello World\");",
            children: []
          }
        ]
      }
    ],
    code: 'public void testcase(){System.out.println("Hello World");}',
  }
  UPDATE = {
    methodName: Constant.METHOD_NAME_UPDATE,
    template: 'Update',
    params:[
      {
        parentId: 39,
        name: "Step",
        label: "Step",
        showChildren: true,
        editMode: false,
        children: [
          {
            label: "Step",
            name: "Add_Array_String",
            params: [
              {
                id: 1,
                name: "$variable",
                type: "Code",
                value: "data"
              },
              {
                id: 15,
                name: "$array",
                type: "String",
                value: "codeAdd,modelUpdate,11,1001"
              }
            ],
            showChildren: false,
            editMode: false,
            code: "String[] data = new String[]{\"codeAdd\",\"modelUpdate\",\"11\",\"1001\"};",
            children: []
          },
          {
            label: "Step",
            name: "Add_String",
            code: "String start = \"==========Start Update==========\";",
            params: [
              {
                id: 1,
                name: "$variable",
                type: "Code",
                value: "start"
              },
              {
                id: 3,
                name: "$paramValue",
                type: "String",
                value: "==========Start Update=========="
              }
            ],
            showChildren: false,
            editMode: false,
            children: []
          },
          {
            label: "Step",
            name: "Add_String",
            code: "String end = \"==========End Update==========\";",
            params: [
              {
                id: 1,
                name: "$variable",
                type: "Code",
                value: "end"
              },
              {
                id: 3,
                name: "$paramValue",
                type: "String",
                value: "==========End Update=========="
              }
            ],
            showChildren: false,
            editMode: false,
            children: []
          },
          {
            label: "Step",
            name: "Println",
            code: "System.out.println(\"==========Start Update==========\");",
            params: [
              {
                id: 3,
                name: "$paramValue",
                type: "String",
                value: "==========Start Update=========="
              }
            ],
            showChildren: false,
            editMode: false,
            children: []
          },
          {
            label: "Step",
            name: "Call_TemplateQuestion_Function",
            code: "templateQuestion.update();",
            params: [
              {
                id: 1,
                name: "$variable",
                type: "Code",
                value: "update"
              }
            ],
            showChildren: false,
            editMode: false,
            children: []
          },
          {
            label: "Step",
            name: "Println",
            code: "System.out.println(\"==========End Update==========\");",
            params: [
              {
                id: 3,
                name: "$paramValue",
                type: "String",
                value: "==========End Update=========="
              }
            ],
            showChildren: false,
            editMode: false,
            children: []
          },
          {
            label: "Step",
            name: "Check_Console_Constain",
            code: "assertEquals(true, CheckingUtils.checkConsoleLogContains(data, end, start));",
            params: [
              {
                id: 11,
                name: "$expected",
                type: "Code",
                value: "true"
              },
              {
                id: 19,
                name: "$data",
                type: "Code",
                value: "data"
              },
              {
                id: 20,
                name: "$start",
                type: "Code",
                value: "start"
              },
              {
                id: 21,
                name: "$end",
                type: "Code",
                value: "end"
              }
            ],
            showChildren: false,
            editMode: false,
            children: []
          }
        ]
      }
    ],
    code: 'public void checkUpdate(){String[] data = new String[]{"codeAdd","modelUpdate","11","1001"};String start = "==========Start Update==========";String end = "==========End Update==========";System.out.println("==========Start Update==========");templateQuestion.update();System.out.println("==========End Update==========");assertEquals(true, CheckingUtils.checkConsoleLogContains(data, end, start));}',
  }

  CREATE = {
    methodName: Constant.METHOD_NAME_CREATE,
    template: 'Create',
    params: [
      {
        parentId: 39,
        name: "Step",
        label: "Step",
        showChildren: true,
        editMode: false,
        children: [
          {
            label: "Step",
            name: "Add_Array_String",
            params: [
              {
                id: 1,
                name: "$variable",
                type: "Code",
                value: "data"
              },
              {
                id: 15,
                name: "$array",
                type: "String",
                value: "codeAdd,modelAdd,10,1000.0"
              }
            ],
            showChildren: false,
            editMode: false,
            code: "String[] data = new String[]{\"codeAdd\",\"modelAdd\",\"10\",\"1000.0\"};",
            children: []
          },
          {
            label: "Step",
            name: "Add_String",
            code: "String start = \"==========Start Insert==========\";",
            params: [
              {
                id: 1,
                name: "$variable",
                type: "Code",
                value: "start"
              },
              {
                id: 3,
                name: "$paramValue",
                type: "String",
                value: "==========Start Insert=========="
              }
            ],
            showChildren: false,
            editMode: false,
            children: []
          },
          {
            label: "Step",
            name: "Add_String",
            code: "String end = \"==========End Insert==========\";",
            params: [
              {
                id: 1,
                name: "$variable",
                type: "Code",
                value: "end"
              },
              {
                id: 3,
                name: "$paramValue",
                type: "String",
                value: "==========End Insert=========="
              }
            ],
            showChildren: false,
            editMode: false,
            children: []
          },
          {
            label: "Step",
            name: "Println",
            code: "System.out.println(\"==========Start Insert==========\");",
            params: [
              {
                id: 3,
                name: "$paramValue",
                type: "String",
                value: "==========Start Insert=========="
              }
            ],
            showChildren: false,
            editMode: false,
            children: []
          },
          {
            label: "Step",
            name: "Call_TemplateQuestion_Function",
            code: "templateQuestion.insert();",
            params: [
              {
                id: 1,
                name: "$variable",
                type: "Code",
                value: "insert"
              }
            ],
            showChildren: false,
            editMode: false,
            children: []
          },
          {
            label: "Step",
            name: "Println",
            code: "System.out.println(\"==========End Insert==========\");",
            params: [
              {
                id: 3,
                name: "$paramValue",
                type: "String",
                value: "==========End Insert=========="
              }
            ],
            showChildren: false,
            editMode: false,
            children: []
          },
          {
            label: "Step",
            name: "Check_Console_Constain",
            code: "assertEquals(true, CheckingUtils.checkConsoleLogContains(data, end, start));",
            params: [
              {
                id: 11,
                name: "$expected",
                type: "Code",
                value: "true"
              },
              {
                id: 19,
                name: "$data",
                type: "Code",
                value: "data"
              },
              {
                id: 20,
                name: "$start",
                type: "Code",
                value: "start"
              },
              {
                id: 21,
                name: "$end",
                type: "Code",
                value: "end"
              }
            ],
            showChildren: false,
            editMode: false,
            children: []
          }
        ]
      }
    ],
    code: 'public void checkCreate(){String[] data = new String[]{"codeAdd","modelAdd","10","1000.0"};String start = "==========Start Insert==========";String end = "==========End Insert==========";System.out.println("==========Start Insert==========");templateQuestion.insert();System.out.println("==========End Insert==========");assertEquals(true, CheckingUtils.checkConsoleLogContains(data, end, start));}',
  }

  SEARCH = {
    methodName: Constant.METHOD_NAME_SEARCH,
    template: 'Search',
    params: [
      {
        parentId: 39,
        name: "Step",
        label: "Step",
        showChildren: true,
        editMode: false,
        children: [
          {
            label: "Step",
            name: "Add_Array_String",
            params: [
              {
                id: 1,
                name: "$variable",
                type: "Code",
                value: "data"
              },
              {
                id: 15,
                name: "$array",
                type: "String",
                value: "codeAdd,modelAdd,10,1000"
              }
            ],
            showChildren: false,
            editMode: false,
            code: "String[] data = new String[]{\"codeAdd\",\"modelAdd\",\"10\",\"1000\"};",
            children: []
          },
          {
            label: "Step",
            name: "Add_String",
            code: "String start = \"==========Start Search==========\";",
            params: [
              {
                id: 1,
                name: "$variable",
                type: "Code",
                value: "start"
              },
              {
                id: 3,
                name: "$paramValue",
                type: "String",
                value: "==========Start Search=========="
              }
            ],
            showChildren: false,
            editMode: false,
            children: []
          },
          {
            label: "Step",
            name: "Add_String",
            code: "String end = \"==========End Search==========\";",
            params: [
              {
                id: 1,
                name: "$variable",
                type: "Code",
                value: "end"
              },
              {
                id: 3,
                name: "$paramValue",
                type: "String",
                value: "==========End Search=========="
              }
            ],
            showChildren: false,
            editMode: false,
            children: []
          },
          {
            label: "Step",
            name: "Println",
            code: "System.out.println(\"==========Start Search==========\");",
            params: [
              {
                id: 3,
                name: "$paramValue",
                type: "String",
                value: "==========Start Search=========="
              }
            ],
            showChildren: false,
            editMode: false,
            children: []
          },
          {
            label: "Step",
            name: "Call_TemplateQuestion_Function",
            code: "templateQuestion.search();",
            params: [
              {
                id: 1,
                name: "$variable",
                type: "Code",
                value: "search"
              }
            ],
            showChildren: false,
            editMode: false,
            children: []
          },
          {
            label: "Step",
            name: "Println",
            code: "System.out.println(\"==========End Search==========\");",
            params: [
              {
                id: 3,
                name: "$paramValue",
                type: "String",
                value: "==========End Search=========="
              }
            ],
            showChildren: false,
            editMode: false,
            children: []
          },
          {
            label: "Step",
            name: "Check_Console_Constain",
            code: "assertEquals(true, CheckingUtils.checkConsoleLogContains(data, end, start));",
            params: [
              {
                id: 11,
                name: "$expected",
                type: "Code",
                value: "true"
              },
              {
                id: 19,
                name: "$data",
                type: "Code",
                value: "data"
              },
              {
                id: 20,
                name: "$start",
                type: "Code",
                value: "start"
              },
              {
                id: 21,
                name: "$end",
                type: "Code",
                value: "end"
              }
            ],
            showChildren: false,
            editMode: false,
            children: []
          }
        ]
      }
    ],
    code: 'public void checkSearch(){String[] data = new String[]{"codeAdd","modelAdd","10","1000"};String start = "==========Start Search==========";String end = "==========End Search==========";System.out.println("==========Start Search==========");templateQuestion.search();System.out.println("==========End Search==========");assertEquals(true, CheckingUtils.checkConsoleLogContains(data, end, start));}',
  }
  DELETE = {
    methodName: Constant.METHOD_NAME_DELETE,
    template: 'Delete',
    params: [
      {
        parentId: 39,
        name: "Step",
        label: "Step",
        showChildren: true,
        editMode: false,
        children: [
          {
            label: "Step",
            name: "Add_Array_String",
            params: [
              {
                id: 1,
                name: "$variable",
                type: "Code",
                value: "data"
              },
              {
                id: 15,
                name: "$array",
                type: "String",
                value: "codeAdd,modelAdd,10,1000"
              }
            ],
            showChildren: false,
            editMode: false,
            code: "String[] data = new String[]{\"codeAdd\",\"modelAdd\",\"10\",\"1000\"};",
            children: []
          },
          {
            label: "Step",
            name: "Add_String",
            code: "String start = \"==========Start Remove==========\";",
            params: [
              {
                id: 1,
                name: "$variable",
                type: "Code",
                value: "start"
              },
              {
                id: 3,
                name: "$paramValue",
                type: "String",
                value: "==========Start Remove=========="
              }
            ],
            showChildren: false,
            editMode: false,
            children: []
          },
          {
            label: "Step",
            name: "Add_String",
            code: "String end = \"==========End Remove==========\";",
            params: [
              {
                id: 1,
                name: "$variable",
                type: "Code",
                value: "end"
              },
              {
                id: 3,
                name: "$paramValue",
                type: "String",
                value: "==========End Remove=========="
              }
            ],
            showChildren: false,
            editMode: false,
            children: []
          },
          {
            label: "Step",
            name: "Println",
            code: "System.out.println(\"==========Start Remove==========\");",
            params: [
              {
                id: 3,
                name: "$paramValue",
                type: "String",
                value: "==========Start Remove=========="
              }
            ],
            showChildren: false,
            editMode: false,
            children: []
          },
          {
            label: "Step",
            name: "Call_TemplateQuestion_Function",
            code: "templateQuestion.remove();",
            params: [
              {
                id: 1,
                name: "$variable",
                type: "Code",
                value: "remove"
              }
            ],
            showChildren: false,
            editMode: false,
            children: []
          },
          {
            label: "Step",
            name: "Println",
            code: "System.out.println(\"==========End Remove==========\");",
            params: [
              {
                id: 3,
                name: "$paramValue",
                type: "String",
                value: "==========End Remove=========="
              }
            ],
            showChildren: false,
            editMode: false,
            children: []
          },
          {
            label: "Step",
            name: "Check_Console_Constain",
            code: "assertEquals(false, CheckingUtils.checkConsoleLogContains(data, end, start));",
            params: [
              {
                id: 11,
                name: "$expected",
                type: "Code",
                value: "false"
              },
              {
                id: 19,
                name: "$data",
                type: "Code",
                value: "data"
              },
              {
                id: 20,
                name: "$start",
                type: "Code",
                value: "start"
              },
              {
                id: 21,
                name: "$end",
                type: "Code",
                value: "end"
              }
            ],
            showChildren: false,
            editMode: false,
            children: []
          }
        ]
      }
    ],
    code: 'public void checkDelete(){String[] data = new String[]{"codeAdd","modelAdd","10","1000"};String start = "==========Start Remove==========";String end = "==========End Remove==========";System.out.println("==========Start Remove==========");templateQuestion.remove();System.out.println("==========End Remove==========");assertEquals(false, CheckingUtils.checkConsoleLogContains(data, end, start));}',
  }
}
