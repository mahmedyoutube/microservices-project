import express, { Request, Response } from "express";
import { Chat } from "../../models/chat";
import mongoose from "mongoose";
import { User } from "../../models/user";
import { Todo } from "../../models/todo";
import { NotFoundError } from "../../errors";
import { eventTypes } from "../eventTypes";

interface contentType {
  type: eventTypes;
  message: string;
  fromUserId: string;
  toUserId: string;
  todoId: string;
  chatId: string;
}

class ChatEvent {
  constructor(private content: contentType, private ack: () => void) {
    this.perfomeOperations(this.content.type);
  }

  async perfomeOperations(type: eventTypes) {
    switch (type) {
      case eventTypes.CREATED: {
        return await this.createChat();
      }
      case eventTypes.UPDATED: {
        return await this.updateChat();
      }
      case eventTypes.DELETED: {
        return await this.deleteChat();
      }
      default:
        return;
    }
  }

  async createChat() {
    const { message, fromUserId, toUserId, todoId, chatId } = this.content;

    // or you can pass token in a request and extract userId from it, ( best for security reason also )
    const chat = Chat.build({ message, fromUserId, toUserId, todoId, chatId });
    await chat.save();
    this.ack();
  }
  async updateChat() {
    const { message, chatId } = this.content;

    const chat = await Chat.findOne({ chatId });
    if (!chat) {
      throw new NotFoundError();
    }
    chat!.message = message;

    await chat!.save();
    this.ack();
  }
  async deleteChat() {
    const { chatId } = this.content;

    await Chat.findOneAndDelete({ chatId });
    this.ack();
  }
}

export default ChatEvent;
