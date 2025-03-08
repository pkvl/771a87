import { FieldAssociation } from "@/stores/types";
import axios from "axios";

type APISyncGraphBody = {
  associations: FieldAssociation[];
};

export async function getGraph(tenantId = "123", blueprintId = "bp_456") {
  //localhost:3000/api/v1/123/actions/blueprints/bp_456/graph
  try {
    const response = await axios.get(
      `${process.env.API_HOST}/api/v1/${tenantId}/actions/blueprints/${blueprintId}/graph`
    );
    // console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function syncGraph(body: APISyncGraphBody) {
  //localhost:3000/api/v1/123/actions/blueprints/bp_456/graph
  try {
    const response = await axios.post(
      `${process.env.API_HOST}/api/v1/sync-graph-router`,
      body
    );
    // console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}
