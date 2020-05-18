import { getMongoRepository, MongoRepository } from 'typeorm';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';

class NotificationsRepotisoty implements INotificationsRepository {
  private ormrRepository: MongoRepository<Notification>;

  constructor() {
    this.ormrRepository = getMongoRepository(Notification, 'mongo');
  }

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = this.ormrRepository.create({
      content,
      recipient_id,
    });

    await this.ormrRepository.save(notification);

    return notification;
  }
}
export default NotificationsRepotisoty;
