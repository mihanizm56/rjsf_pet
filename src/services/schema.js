export const schema = {
  mainSchema: {
    name: "test-schema-creds",
    type: "object",
    title: "Profile",
    description: "The payment method",
    properties: {
      firstRow: {
        title: "",
        type: "object",
        properties: {
          firstCol: {
            title: "",
            type: "object",
            // required: ["name"],
            properties: {
              name: {
                type: "string",
                pattern: "^[a-z ]{2,3}$"
              },
              number: {
                type: "string"
              }
            }
          }
          // secondCol: {
          //   title: "",
          //   type: "object",
          //   // required: ["cvv"],
          //   properties: {
          //     "expired date": {
          //       type: "string"
          //     },
          //     cvv: {
          //       type: "string",
          //       maxLength: 3
          //     }
          //   }
          // }
        }
      }
      // secondRow: {
      //   title: "",
      //   type: "object",
      //   properties: {
      //     firstCol: {
      //       title: "",
      //       type: "object",

      //       properties: {
      //         login: {
      //           type: "string"
      //         },
      //         password: {
      //           type: "string"
      //         }
      //       }
      //     }
      //   }
      // }
    }

    // dependencies: {
    //   cvv: {
    //     properties: {
    //       test: { type: "string" }
    //     }
    //     // required: ["test"]
    //   }
    // }
  },
  uiSchema: {
    firstRow: {
      direction: "row",
      firstCol: {
        direction: "column",
        name: { "ui:widget": "text" }
        // number: { "ui:widget": "masked-input" }
      }
      // secondCol: {
      //   direction: "column",
      //   cvv: { "ui:widget": "text" },
      //   "expired date": { "ui:widget": "date" }
      // }
    }
    // secondRow: {
    //   direction: "row",
    //   withPadding: true,
    //   firstCol: {
    //     direction: "column",
    //     login: { "ui:widget": "text" },
    //     password: { "ui:widget": "text" }
    //   }
    // }
  }
};

export const testErrors = {
  firstRow: {
    firstCol: {
      name: { __errors: ["test error"] },
      number: { __errors: ["test error"] }
    }
  }
};
