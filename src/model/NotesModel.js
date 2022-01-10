//import
const mongoose = require("mongoose");
const logger = require("../middleware/logger");

const NotesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    colour: {
      type: String,
    },
    isArchived: {
      type: Boolean,
    },
    isDeleted: {
      type: Boolean,
    },
    userId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const NotesDb = mongoose.model("Notes", NotesSchema);

class ModelClass {
  //find all notes based on query
  findNotes(req) {
    let response = {
      message: "",
      data: "",
      success: "",
      status: 200,
    };

    return new Promise((resolve, reject) => {
      NotesDb.find(req)
        .then((data) => {
          if (data.length > 0) {
            (response.success = true),
              (response.data = data),
              (response.status = 200),
              (response.message = "Notes Found");
            resolve(response);
          } else {
            resolve({
              message: "Notes not found ",
              data: [],
              status: 200,
            });
          }
        })
        .catch((err) => {
          logger.error("inside model err ", err);
          reject({ success: false, error: err });
        });
    });
  }

  //method to save notes to db
  saveModel(req) {
    let response = {
      success: true,
      message: "",
      data: "",
    };

    return new Promise((resolve, reject) => {
      req
        .save()
        .then((data) => {
          (response.success = true), (response.message = "notes saved");
          (response.data = data), (response.status = 200);
          resolve({ response });
        })
        .catch((err) => {
          logger.error("inside model err ", err);
          (response.success = false),
            (response.message = "notes are not saved");
          (response.data = err), (response.status = 400);
          reject({ response });
        });
    });
  }

  //update notes to db
  updateModel(req, newNote) {
    return new Promise((resolve, reject) => {
      var response = {
        success: false,
        message: "",
        data: "",
      };

      console.log(req,newNote);
      NotesDb.updateOne(req, newNote, { new: true })
        .then((result) => {
          response.success = true;
          response.message = "Note Updated Successfully";
          response.data = result;
          response.status = 200;
          resolve(response);
        })
        .catch((err) => {
          logger.error("inside model err ", result);
          response.success = false;
          response.message = err;
          reject(response);
        });

      //alternative method
      /*  NotesDb.findByIdAndUpdate({ _id: req.body.noteId }, newNote, {
        new: true,
      })
        .then((data) => {
          response.success = true;
          response.message = "Note Updated Successfully";
          response.data = data;
          response.status = 200;
          resolve(response);
        })
        .catch((err) => {
          response.success = false;
          response.message = err;
          reject(response);
        });  */
    });
  }

  //delete notes in db
  deleteModel(req) {
    return new Promise((resolve, reject) => {
      var response = {
        success: false,
        message: "",
        data: "",
      };

      NotesDb.deleteOne(req)
        .then((result) => {
          response.success = true;
          response.message = "Note Deleted Successfully";
          response.data = result;
          response.status = 200;
          resolve(response);
        })
        .catch((err) => {
          logger.error("inside model err ", result);
          response.success = false;
          response.message = err;
          reject(response);
        });

      //alternative method
      /*NotesDb.findByIdAndDelete({ _id: req.body.noteId })
        .then((data) => {
          response.success = true;
          response.message = "Note deleted Successfully";
          response.data = data;
          response.status = 200;
          resolve(response);
        })
        .catch((err) => {
          response.success = false;
          response.message = err;
          reject(response);
        }); */
    });
  }
}

module.exports = { ModelClass, NotesDb };
