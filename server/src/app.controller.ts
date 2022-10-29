import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { text } from './text.js';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/request')
  create(@Body() body): string {
    let request = body;
    let min = request['example minimum length'];
    let max = request['example maximum length'];
    let number = request['number of examples'];

    function ReadFile(text) {
      return text
        .replace(/(\r\n|\n|\r)/gm, '')
        .replace(/([.?!])\s*(?=[A-Z])/g, '$1|')
        .split('|');
    }

    function RemoveExceedingLengths(file) {
      return fileContent.filter(
        (paragraph) => paragraph.length < max && paragraph.length > min,
      );
    }

    function SearchExamples(file) {
      return file.filter((paragraph) => {
        let isExample = 0;
        for (let i = 0; i < request.words.length; i++) {
          if (paragraph.includes(request.words[i])) {
            isExample++;
          }
        }

        if (isExample == request.words.length) {
          return true;
        }
      });
    }
    function ConvertToJSON(file) {
      return JSON.stringify({ ...file });
    }

    let fileContent = ReadFile(text);
    fileContent = RemoveExceedingLengths(fileContent);
    fileContent = SearchExamples(fileContent);
    fileContent.length = number;
    let jsonFileContent = ConvertToJSON(fileContent);

    return jsonFileContent;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
