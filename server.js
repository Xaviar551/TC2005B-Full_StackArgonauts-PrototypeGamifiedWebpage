import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import EmployeeController from "./controller/Employee.js";
import EmployeeModel from "./models/Employee.js";
import UnityCallsController from "./controller/UnityCalls.js";
import UnityCallsModel from "./controller/UnityCalls.js";
import session from "express-session";
import path from "path";

const app = express();
const router = express.Router();
const port = 3000;

let init_routes = (app, controllerEmployee) => {
    app.use(cookieParser());
    app.use(express.json());
    app.use(cors());
    app.use(express.urlencoded({ extended: true }));

    app.use(express.static("public"));
    app.use("/css", express.static(path.resolve("./public/css")));
    app.use("/js", express.static(path.resolve("./public/js")));
    app.use("/img", express.static(path.resolve("./public/img")));

    app.set("views", "./views");
    app.set("view engine", "ejs");
    app.get("/", async (req, res) => {
        if (!req.session.user_id) return res.redirect("/login");

        let params = Object.assign({}, req.params, req.body, req.query);
        let ID_creator_proyect =
            await controllerEmployee.get_ID_creator_proyect(params);
        let Issue_total = await controllerEmployee.get_Issue_total();
        let Not_closed = await controllerEmployee.get_not_closed();
        console.log(Issue_total);

        res.render("index", { ID_creator_proyect, Issue_total, Not_closed });
    });
    app.get("/about", (req, res) => {
        if (!req.session.user_id) return res.redirect("/login");
        res.render("About");
    });
    app.get("/game", (req, res) => {
        if (!req.session.user_id) return res.redirect("/login");

        res.render("Game");
    });
    app.get("/login", (req, res) => {
        res.render("login", { login_error: "" });
    });
    app.use("/", router);
    app.listen(port, () => {
        console.log(`The server is in: localhost:${port}`);
    });

    app.post("/login", async (req, res) => {
        var sess = req.session;
        var entered_email = req.body.email;
        var entered_pass = req.body.password;
        var user = await employeeController.get_user(req.body.email);

        if (user.length == 1) {
            if (
                user[0].email == entered_email &&
                user[0].password == entered_pass
            ) {
                sess.user_id = user[0].id;
                return res.redirect("/");
            }
        }
        // show error message
        res.render("login", { login_error: "Verifique sus credenciales" });
    });
    app.post("/register", async (req, res) => {
        var sess = req.session;
        var user = (await employeeController.get_user(req.body.email))[0];

        // TODO: verify unique email and password, create
        // new user, and sign in
        if (user.length == 0) {
            return res.redirect("/");
        }

        // run if all is well
    });

    app.get("/logout", (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                return console.log(err);
            }
            res.redirect("/login");
        });
    });
};

app.use(
    session({
        secret: "we do not keep secrets yet",
        resave: false,
        saveUninitialized: true,
    })
);

let employeeModel = new EmployeeModel();
let employeeController = new EmployeeController(employeeModel);

let unityCallsModel = new UnityCallsModel();
let unityCallsController = new UnityCallsController(unityCallsModel);
init_routes(app, employeeController, unityCallsController);
