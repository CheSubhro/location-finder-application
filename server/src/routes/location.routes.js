

import { Router } from "express";
import { registerLocation,searchLocation,getAllLocations } from "../controllers/location.controller.js";


const router = Router()

router.route("/regloc").post(registerLocation)
router.route("/searchloc").get(searchLocation)
router.route("/getallloc").get(getAllLocations)

export default router
