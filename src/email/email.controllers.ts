import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { EmailService } from './email.services';
import { CreateEmailDto } from './dto/createEmail.dto';
import { CreateStarredDto } from './dto/createStarred.dto';
import { CreateSnoozeDto } from './dto/createSnooze.dto';
import { FetchUserInboxDto } from './dto/fetchUserInbox.dto';
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor';
import { TransformInterceptor } from 'src/common/interceptors/tranform.interceptor';
import { ExceptionInterceptor } from 'src/common/interceptors/exception.interceptor';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  COMPOSE_DESCRIPTION,
  COMPOSE_OPERATION_SUCCESSFUL,
  DELETE_EMAIL_DESCRIPTION,
  DELETE_OPERATION_SUCCESSFUL,
  DRAFT_DELETE_OPERATION_SUCCESSFUL,
  DRAFT_DELETE_SUMMARY,
  DRAFT_GET_OPERATION_SUCCESSFUL,
  DRAFT_GET_SUMMARY,
  DRAFT_POST_OPERATION_SUCCESSFUL,
  DRAFT_POST_SUMMARY,
  DRAFT_PUT_OPERATION_SUCCESSFUL,
  DRAFT_PUT_SUMMARY,
  DRAFT_TO_EMAIL_OPERATION_SUCCESSFUL,
  DRAFT_TO_EMAIL_SUMMARY,
  EMAIL_DESCRIPTION,
  EMAIL_OPERATION_SUCCESSFUL,
  INBOX_DESCRIPTION,
  INBOX_OPERATION_SUCCESSFUL,
  SENT_DESCRIPTION,
  SENT_OPERATION_SUCCESSFUL,
  SNOOZE_DESCRIPTION,
  SNOOZE_OPERATION_SUCCESSFUL,
  SNOOZE_PUT_DESCRIPTION,
  SNOOZE_PUT_OPERATION_SUCCESSFUL,
  STARRED_DESCRIPTION,
  STARRED_OPERATION_SUCCESSFUL,
  STARRED_PUT_DESCRIPTION,
  STARRED_PUT_OPERATION_SUCCESSFUL,
  USER_DESCRIPTION,
  USER_OPERATION_SUCCESSFUL,
} from 'src/common/interceptors/constants/constant';

@Controller()
@ApiTags('Email')
@UseInterceptors(LoggingInterceptor, TransformInterceptor, ExceptionInterceptor)
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  /**
   * Fetch dashboard data for the user.
   * @param body
   * @param res
   * @returns
   */
  @Get('dashboard')
  @ApiOperation({ summary: EMAIL_DESCRIPTION })
  @ApiResponse({
    status: 200,
    description: EMAIL_OPERATION_SUCCESSFUL,
  })
  async dashboard(@Body() body: FetchUserInboxDto) {
    const response = await this.emailService.getDashboard(body);
    return {
      data: response,
      massage: EMAIL_OPERATION_SUCCESSFUL,
    };
  }

  /**
   * Fetch all users.
   * @param res
   */
  @Get('users')
  @ApiOperation({ summary: USER_DESCRIPTION })
  @ApiResponse({
    status: 200,
    description: USER_OPERATION_SUCCESSFUL,
  })
  async fetchUsers() {
    const response = await this.emailService.getUsers();
    return {
      data: response,
      massage: USER_OPERATION_SUCCESSFUL,
    };
  }

  /**
   * Fetch inbox emails for the user.
   * @param body
   * @param res
   */
  @Get('inbox')
  @ApiOperation({ summary: INBOX_DESCRIPTION })
  @ApiResponse({
    status: 200,
    description: INBOX_OPERATION_SUCCESSFUL,
  })
  async fetchInbox(@Body() body: FetchUserInboxDto) {
    const response = await this.emailService.getInbox(body);
    return {
      data: response,
      massage: INBOX_OPERATION_SUCCESSFUL,
    };
  }

  /**
   * Fetch starred emails for the user.
   * @param body
   * @param res
   */
  @Get('starred')
  @ApiOperation({ summary: STARRED_DESCRIPTION })
  @ApiResponse({
    status: 200,
    description: STARRED_OPERATION_SUCCESSFUL,
  })
  async fetchStarredInbox(@Body() body: CreateStarredDto) {
    const response = await this.emailService.getStarred(body);
    return {
      data: response,
      massage: STARRED_OPERATION_SUCCESSFUL,
    };
  }

  /**
   * Fetch snoozed emails for the user.
   * @param res
   */
  @Get('snooze')
  @ApiOperation({ summary: SNOOZE_DESCRIPTION })
  @ApiResponse({
    status: 200,
    description: SNOOZE_OPERATION_SUCCESSFUL,
  })
  async getSnoozedEmails() {
    const response = await this.emailService.getsnoozed();
    return {
      data: response,
      massage: SNOOZE_OPERATION_SUCCESSFUL,
    };
  }

  /**
   * Fetch sent emails for the user.
   * @param body
   * @param res
   */
  @Get('sent')
  @ApiOperation({ summary: SENT_DESCRIPTION })
  @ApiResponse({
    status: 200,
    description: SENT_OPERATION_SUCCESSFUL,
  })
  async getSentEmails(@Body() body: CreateEmailDto) {
    const response = await this.emailService.getsent(body);
    return {
      data: response,
      massage: SENT_OPERATION_SUCCESSFUL,
    };
  }

  /**
   * Mark an email as starred.
   * @param body
   * @param res
   */
  @Put('starred')
  @ApiOperation({ summary: STARRED_PUT_DESCRIPTION })
  @ApiResponse({
    status: 200,
    description: STARRED_PUT_OPERATION_SUCCESSFUL,
  })
  async markEmailStarred(@Body() body: CreateStarredDto) {
    const response = await this.emailService.markStarred(body);
    return {
      data: response,
      massage: STARRED_PUT_OPERATION_SUCCESSFUL,
    };
  }

  /**
   * Mark an email as snoozed.
   * @param body
   * @param res
   */
  @Put('snooze')
  @ApiOperation({ summary: SNOOZE_PUT_DESCRIPTION })
  @ApiResponse({
    status: 200,
    description: SNOOZE_PUT_OPERATION_SUCCESSFUL,
  })
  async markEmailSnooze(@Body() body: CreateSnoozeDto) {
    const response = await this.emailService.snoozeEmail(body);
    return {
      data: response,
      massage: SNOOZE_PUT_OPERATION_SUCCESSFUL,
    };
  }

  /**
   * Send an email.
   * @param createEmailDto
   * @param res
   */
  @Post('compose')
  @ApiOperation({ summary: COMPOSE_DESCRIPTION })
  @ApiResponse({
    status: 200,
    description: COMPOSE_OPERATION_SUCCESSFUL,
  })
  async sendEmail(@Body() createEmailDto: CreateEmailDto) {
    const response = await this.emailService.sendEmail(createEmailDto);
    return {
      data: response,
      massage: COMPOSE_OPERATION_SUCCESSFUL,
    };
  }

  /**
   * delete an email
   * @param body
   * @param res
   */
  @Delete('/:id')
  @ApiOperation({ summary: DELETE_EMAIL_DESCRIPTION })
  @ApiResponse({
    status: 200,
    description: DELETE_OPERATION_SUCCESSFUL,
  })
  async deleteEmail(@Param('id', ParseIntPipe) id: number) {
    const response = await this.emailService.deleteEmail(id);
    return {
      data: response,
      massage: DELETE_OPERATION_SUCCESSFUL,
    };
  }

  /**
   * get drafts from draft table
   * @returns
   */
  @Get('drafts')
  @ApiOperation({ summary: DRAFT_GET_SUMMARY })
  @ApiResponse({
    status: 200,
    description: DRAFT_GET_OPERATION_SUCCESSFUL,
  })
  async getDraftEmails() {
    const response = await this.emailService.getDraft();
    return {
      data: response,
      massage: DRAFT_GET_OPERATION_SUCCESSFUL,
    };
  }

  /**
   * update draft table
   * @param id
   * @param body
   * @returns
   */
  @Put('drafts/:id')
  @ApiOperation({ summary: DRAFT_PUT_SUMMARY })
  @ApiResponse({
    status: 200,
    description: DRAFT_PUT_OPERATION_SUCCESSFUL,
  })
  async updateDraftEmails(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any,
  ) {
    const response = await this.emailService.updateDraft(id, body);
    return {
      data: response,
      massage: DRAFT_PUT_OPERATION_SUCCESSFUL,
    };
  }

  /**
   * upload draft in table
   * @param body
   * @returns
   */
  @Post('drafts')
  @ApiOperation({ summary: DRAFT_POST_SUMMARY })
  @ApiResponse({
    status: 200,
    description: DRAFT_POST_OPERATION_SUCCESSFUL,
  })
  async sendDraftEmails(@Body() body: any) {
    const response = await this.emailService.uploadDraft(body);
    return {
      data: response,
      massage: DRAFT_POST_OPERATION_SUCCESSFUL,
    };
  }

  /**
   * delete draft from draft table
   * @param id
   * @returns
   */
  @Delete('drafts/:id')
  @ApiOperation({ summary: DRAFT_DELETE_SUMMARY })
  @ApiResponse({
    status: 200,
    description: DRAFT_DELETE_OPERATION_SUCCESSFUL,
  })
  async deleteDraftEmails(@Param('id', ParseIntPipe) id: number) {
    const response = await this.emailService.deleteDraft(id);
    return {
      data: response,
      massage: DRAFT_DELETE_OPERATION_SUCCESSFUL,
    };
  }

  /**
   * send draft mail from draft table to emails table
   * @param id
   * @returns
   */
  @Post('drafts/send/:id')
  @ApiOperation({ summary: DRAFT_TO_EMAIL_SUMMARY })
  @ApiResponse({
    status: 200,
    description: DRAFT_TO_EMAIL_OPERATION_SUCCESSFUL,
  })
  async uploadDraftInEmails(@Param('id', ParseIntPipe) id: number) {
    const response = await this.emailService.uploadDraftInEmail(id);
    return {
      data: response,
      massage: DRAFT_TO_EMAIL_OPERATION_SUCCESSFUL,
    };
  }
}
