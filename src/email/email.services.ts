import { Injectable, Post } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateSnoozeDto } from './dto/createSnooze.dto';
import { CreateStarredDto } from './dto/createStarred.dto';
import { FetchUserInboxDto } from './dto/fetchUserInbox.dto';
import { CreateEmailDto } from './dto/createEmail.dto';
import { error } from 'console';

@Injectable()
export class EmailService {
  constructor(private prisma: PrismaService) {}
  async getUsers() {
    return await this.prisma.users.findMany();
  }

  async getDashboard(data: FetchUserInboxDto) {
    const recipient = data.recipient;
    const userDetails = await this.prisma.users.findUnique({
      where: {
        email: recipient,
      },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });

    const inboxEmails = await this.prisma.emails.findMany({
      where: {
        recipient: recipient,
      },
    });
    const inboxCount = inboxEmails.length;
    const navigation = {
      inbox: '/inbox',
      starred: '/starred',
      snoozed: '/snoozed',
      sent: '/compose',
    };
    const dashboardData = {
      userDetails: userDetails,
      navigation: navigation,
      inboxCount: inboxCount,
      inboxEmails: inboxEmails,
    };
    return dashboardData;
  }

  async getInbox(data: FetchUserInboxDto) {
    const inboxEmails = await this.prisma.emails.findMany({
      where: {
        recipient: data.recipient,
      },
    });
    const inboxCount = inboxEmails.length;
    const inboxData = {
      inboxCount: inboxCount,
      inboxEmails: inboxEmails,
    };
    return inboxData;
  }

  async getStarred(data: CreateStarredDto) {
    const inboxEmails = await this.prisma.emails.findMany({
      where: {
        recipient: data.recipient,
        isStarred: true,
      },
    });
    return inboxEmails;
  }

  async getsnoozed() {
    const inboxEmails = await this.prisma.emails.findMany({
      where: {
        isSnoozed: true,
      },
    });
    return inboxEmails;
  }

  async getsent(data: any) {
    const inboxEmails = await this.prisma.emails.findMany({
      where: {
        sender: data.sender,
      },
    });
    return inboxEmails;
  }

  async markStarred(data: any) {
    if (data.starred === false) {
      const updatedEmail = await this.prisma.emails.update({
        where: {
          id: data.id,
          recipient: data.mail,
        },
        data: { isStarred: false },
      });
      return updatedEmail;
    } else {
      const updatedEmail = await this.prisma.emails.update({
        where: {
          id: data.id,
          recipient: data.mail,
        },
        data: { isStarred: true },
      });
      return updatedEmail;
    }
  }

  async snoozeEmail(data: CreateSnoozeDto) {
    if (data.duration === null) {
      throw new Error('set snooze duration');
    }
    const updatedEmail = await this.prisma.emails.update({
      where: {
        id: data.id,
        recipient: data.recipient,
      },
      data: { isSnoozed: true },
    });

    setTimeout(async () => {
      await this.prisma.emails.update({
        where: {
          id: data.id,
          recipient: data.recipient,
        },
        data: { isSnoozed: false },
      });
    }, data.duration);

    return updatedEmail;
  }

  async sendEmail(data: any) {
    const sentEmail = await this.prisma.emails.create({
      data: {
        id: data.id,
        sender: data.sender,
        recipient: data.recipient,
        subject: data.subject,
        content: data.content,
      },
    });

    return sentEmail;
  }

  async deleteEmail(_id: number) {
    await this.prisma.emails.delete({
      where: {
        id: _id,
      },
    });
    return true;
  }

  async getDraft() {
    return await this.prisma.drafts.findMany();
  }

  async updateDraft(draftId: number, draftData: CreateEmailDto) {
    const { sender, recipient, subject, content } = draftData;
    const existingDraft = await this.prisma.drafts.findUnique({
      where: { id: draftId },
    });

    if (existingDraft.sender !== sender) {
      throw new error('Sender mismatch');
    }

    if (!existingDraft) {
      const newDraft = await this.prisma.drafts.create({
        data: {
          id: draftId,
          sender,
          recipient,
          subject,
          content,
        },
      });
      return newDraft;
    } else {
      const updatedDraft = await this.prisma.drafts.update({
        where: { id: draftId },
        data: {
          recipient: recipient || existingDraft.recipient,
          subject: subject || existingDraft.subject,
          content: content || existingDraft.content,
        },
      });
      return updatedDraft;
    }
  }

  async uploadDraft(data) {
    const sentEmail = await this.prisma.drafts.create({
      data: {
        id: data.id,
        sender: data.sender,
        recipient: data.recipient,
        subject: data.subject,
        content: data.content,
      },
    });

    return sentEmail;
  }

  async deleteDraft(_id) {
    const sentEmail = await this.prisma.drafts.delete({
      where: {
        id: _id,
      },
    });
    return sentEmail;
  }

  async uploadDraftInEmail(draftId) {
    const draft = await this.prisma.drafts.findUnique({
      where: { id: draftId },
    });
    if (!draft) {
      throw new error('Draft not found');
    }
    const lastEmail = await this.prisma.emails.findFirst({
      orderBy: { id: 'desc' },
    });
    const nextId = (lastEmail ? lastEmail.id : 0) + 1;
    const createdEmail = await this.prisma.emails.create({
      data: {
        id: nextId,
        sender: draft.sender,
        recipient: draft.recipient,
        subject: draft.subject,
        content: draft.content,
      },
    });
    await this.prisma.drafts.delete({ where: { id: draftId } });

    return createdEmail;
  }
}
