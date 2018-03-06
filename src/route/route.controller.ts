import { Get, Controller } from '@nestjs/common';
import DataController from '../entity/datamanager';

@Controller('routes')
export class RouteController {
  
  @Get()
  async getRoutes() {
    let routes = DataController.getInstance().getRoutes();
    let cdnRoutes = [];
    
    routes.forEach(({ cdnRoute }) => {
      let url = `https://cdn.communitydragon.org/:patch`
      cdnRoute.route.forEach((slice: any) => {
        if (slice.type == 'route') {
          url += '/' + slice.value
        } else {
          url += `/:${slice.type}`
        }
      });
      cdnRoutes.push(url)
    });
    return cdnRoutes;
  }
}