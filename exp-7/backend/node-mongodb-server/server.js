var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");
var path = require("path");
var app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "..")));
// Connect to MongoDB
mongoose
    .connect("mongodb://127.0.0.1:27017/contactsDB")
    .then(function () { return console.log("✅ Connected to MongoDB"); })
    .catch(function (err) { return console.error("❌ MongoDB connection error:", err); });
// -------------------- Contact Schema and Routes --------------------
// Define the Contact schema and model
var ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    msg: { type: String, required: true },
});
var Contact = mongoose.model("Contact", ContactSchema);
// Create Contact
app.post("/contacts", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var contact, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                contact = new Contact(req.body);
                return [4 /*yield*/, contact.save()];
            case 1:
                _a.sent();
                res.status(201).json(contact);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(500).json({ error: "Failed to create contact" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Get All Contacts with Search and Pagination
app.get("/contacts", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var search, query, contacts, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                search = req.query.search;
                query = search
                    ? {
                        $or: [
                            { name: { $regex: search, $options: "i" } },
                            { email: { $regex: search, $options: "i" } },
                            { msg: { $regex: search, $options: "i" } },
                        ],
                    }
                    : {};
                return [4 /*yield*/, Contact.find(query)];
            case 1:
                contacts = _a.sent();
                res.json(contacts);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(500).json({ error: "Failed to fetch contacts" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Update Contact
app.put("/contacts/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var updatedContact, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Contact.findByIdAndUpdate(req.params.id, req.body, { new: true })];
            case 1:
                updatedContact = _a.sent();
                res.json(updatedContact);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                res.status(500).json({ error: "Failed to update contact" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Delete Contact
app.delete("/contacts/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Contact.findByIdAndDelete(req.params.id)];
            case 1:
                _a.sent();
                res.json({ message: "Contact deleted" });
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                res.status(500).json({ error: "Failed to delete contact" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// -------------------- Poultry Schema and Routes --------------------
// Define the Poultry schema and model
var PoultrySchema = new mongoose.Schema({
    numChickens: { type: Number, required: true },
    eggsPerChicken: { type: Number, required: true },
    days: { type: Number, required: true },
    totalEggs: { type: Number, required: true },
});
var Poultry = mongoose.model("Poultry", PoultrySchema);
// Save Poultry Data
app.post("/poultry", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var poultryData, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                poultryData = new Poultry(req.body);
                return [4 /*yield*/, poultryData.save()];
            case 1:
                _a.sent();
                console.log("Poultry data saved:", poultryData); // Log the saved data
                res.status(201).json(poultryData);
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                res.status(500).json({ error: "Failed to save poultry data" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Get All Poultry Data
app.get("/poultry", function (_req, res) { return __awaiter(_this, void 0, void 0, function () {
    var poultryData, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Poultry.find()];
            case 1:
                poultryData = _a.sent();
                res.json(poultryData);
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                res.status(500).json({ error: "Failed to fetch poultry data" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get("/contacts", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var search, query, contacts, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                search = req.query.search;
                query = search
                    ? {
                        $or: [
                            { name: { $regex: search, $options: "i" } },
                            { email: { $regex: search, $options: "i" } },
                            { msg: { $regex: search, $options: "i" } },
                        ],
                    }
                    : {};
                return [4 /*yield*/, Contact.find(query)];
            case 1:
                contacts = _a.sent();
                res.json(contacts);
                return [3 /*break*/, 3];
            case 2:
                error_7 = _a.sent();
                res.status(500).json({ error: "Failed to fetch contacts" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// -------------------- Server Initialization --------------------
app.listen(3000, function () {
    console.log("🚀 Server running on http://localhost:3000");
});
