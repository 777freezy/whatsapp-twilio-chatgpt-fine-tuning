import { Request, Response } from "express";
import { Controller, Post } from "@overnightjs/core";
import { Logger } from "@overnightjs/logger";
import { sendMessage } from "../utils/twilio";
import { runQuery } from "../utils/openai";

@Controller("api/bot")
export class BotController {
  @Post()
  private async sendMessage(request: Request, response: Response) {
    const { Body, To, From } = request.body;

    try {
      await runQuery(Body, From);
      return response.status(200).send("SUCCESS");
    } catch (error) {
      console.error("error is ", error);
      Logger.Err(error);
      return response.status(500).send("ERROR");
    }
  }
}
