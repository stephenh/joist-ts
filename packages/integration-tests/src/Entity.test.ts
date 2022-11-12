import { Author } from "@src/entities";
import { insertAuthor } from "@src/entities/inserts";
import { newEntityManager } from "@src/setupDbTests";

describe("Entity", () => {
  it("does not expose the metadata via Object.keys/enumerable properties", async () => {
    await insertAuthor({ first_name: "f" });
    const em = newEntityManager();
    const author = await em.load(Author, "1");
    const copy = deepCopyAndNormalize(author);
    expect(copy).toMatchInlineSnapshot(`
      {
        "afterCommitIdIsSet": false,
        "afterCommitIsDeletedEntity": false,
        "afterCommitIsNewEntity": false,
        "afterCommitRan": false,
        "afterValidationRan": false,
        "ageRuleInvoked": 0,
        "authors": {
          "fieldName": "authors",
          "otherColumnName": "mentor_id",
          "otherFieldName": "mentor",
          "undefined": null,
        },
        "beforeCreateRan": false,
        "beforeDeleteRan": false,
        "beforeFlushRan": false,
        "beforeUpdateRan": false,
        "bookComments": {
          "fieldName": "bookComments",
          "fn": {},
          "loadHint": {
            "books": {
              "comments": {},
            },
          },
          "loaded": false,
          "reactiveHint": {
            "books": {
              "comments": "text",
            },
          },
        },
        "bookCommentsCalcInvoked": 0,
        "books": {
          "fieldName": "books",
          "otherColumnName": "author_id",
          "otherFieldName": "author",
          "undefined": null,
        },
        "comments": {
          "fieldName": "comments",
          "otherColumnName": "parent_author_id",
          "otherFieldName": "parent",
          "undefined": null,
        },
        "currentDraftBook": {
          "_isLoaded": false,
          "fieldName": "currentDraftBook",
          "isCascadeDelete": false,
          "otherFieldName": "currentDraftAuthor",
          "undefined": null,
        },
        "deleteDuringFlush": false,
        "graduatedRuleInvoked": 0,
        "image": {
          "_isLoaded": false,
          "fieldName": "image",
          "isCascadeDelete": true,
          "otherColumnName": "author_id",
          "otherFieldName": "author",
          "undefined": null,
        },
        "latestComment": {
          "_isLoaded": false,
          "opts": {
            "get": {},
            "isLoaded": {},
            "load": {},
          },
          "undefined": null,
        },
        "mentor": {
          "_isLoaded": false,
          "fieldName": "mentor",
          "isCascadeDelete": false,
          "otherFieldName": "authors",
          "undefined": null,
        },
        "mentorRuleInvoked": 0,
        "numberOfBooks": {
          "fieldName": "numberOfBooks",
          "fn": {},
          "loadHint": {
            "books": {},
          },
          "loaded": false,
          "reactiveHint": [
            "books",
            "firstName",
          ],
        },
        "numberOfBooks2": {
          "fn": {},
          "hint": "books",
          "loaded": false,
        },
        "numberOfBooksCalcInvoked": 0,
        "publisher": {
          "_isLoaded": false,
          "fieldName": "publisher",
          "isCascadeDelete": false,
          "otherFieldName": "authors",
          "undefined": null,
        },
        "reviewedBooks": {
          "_isLoaded": false,
          "opts": {
            "add": {},
            "get": {},
            "isLoaded": {},
            "load": {},
            "remove": {},
            "set": {},
          },
        },
        "reviews": {
          "_isLoaded": false,
          "opts": {
            "get": {},
            "isLoaded": {},
            "load": {},
          },
        },
        "tags": {
          "addedBeforeLoaded": [],
          "columnName": "author_id",
          "fieldName": "tags",
          "isCascadeDelete": false,
          "joinTableName": "authors_to_tags",
          "otherColumnName": "tag_id",
          "otherFieldName": "authors",
          "removedBeforeLoaded": [],
        },
      }
    `);
  });
});

// Based on the deep copy that was tripping up Webstorm
function deepCopyAndNormalize(value: any) {
  const active: unknown[] = [];
  return (function doCopy(value, path): any {
    if (value == null) {
      return value;
    }
    if (typeof value === "number" || typeof value === "boolean" || typeof value === "string") {
      return value;
    }
    if (value instanceof RegExp) {
      return value;
    }

    if (active.indexOf(value) !== -1) {
      return "[Circular reference found] Truncated by IDE";
    }
    active.push(value);
    try {
      if (Array.isArray(value)) {
        return value.map(function (element, i) {
          return doCopy(element, `${path}.${i}`);
        });
      }

      if (isObject(value)) {
        var keys = Object.keys(value);
        keys.sort();
        var ret: any = {};
        keys.forEach(function (key) {
          // If we hint anything with `.hooks` assume it's metadata
          if (key === "hooks") {
            throw new Error(`Recursed into the metadata: ${path}`);
          }
          ret[key] = doCopy(value[key], `${path}.${key}`);
        });
        return ret;
      }
      return value;
    } finally {
      active.pop();
    }
  })(value, "value");
}

function isObject(val: any): boolean {
  return val === Object(val);
}
