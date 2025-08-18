import {app} from '@/app';
import {V1_API} from '@/Constants/Route';
import supertest from 'supertest';
import {describe, expect, it} from '@jest/globals';
import {IProduct} from '@/Models/v1/Product.Model';
describe('v1 Api', () => {
  describe('Product', () => {
    describe('Get All Products', () => {
      //  All Product
      it('Should Return Product List Status 200', async () => {
        const {statusCode, body} = await supertest(app).get(`${V1_API}/products`);
        expect(statusCode).toEqual(200);
        expect(body).toHaveProperty('data');
        expect(body.data.length).toBeGreaterThan(0);
      });

      it('should Return 5 Product Default Limit', async () => {
        const {statusCode, body} = await supertest(app).get(`${V1_API}/products`);
        expect(statusCode).toEqual(200);
        expect(body.data.length).toEqual(5);
      });

      //  with Pagination Page + limit
      it('should Return 10 Product When Limit equal 10', async () => {
        const {statusCode, body} = await supertest(app).get(`${V1_API}/products?limit=10`);
        expect(statusCode).toEqual(200);
        expect(body.data.length).toEqual(10);
      });

      //  sort
      it('should Return Sorted ASC Product By Title', async () => {
        const {statusCode, body} = await supertest(app).get(`${V1_API}/products?sort=title`);
        expect(statusCode).toEqual(200);

        expect(body.data[0].title < body.data[4].title || body.data[0].title == body.data[4].title).toEqual(true);
      });
      //  Search
      it('should Return Product Has test title Or test Desorption Or test CategoryTitle ', async () => {
        const {statusCode, body} = await supertest(app).get(`${V1_API}/products?search=test`);
        expect(statusCode).toEqual(200);
        expect(body.data[0].title.includes('test') || body.data[0].description.includes('test') || body.data[0].Category.title.includes('test')).toEqual(true);
      });

      it("should Return (Empty List) When Product hasn't test123 title Or test Desorption Or test CategoryTitle ", async () => {
        const {statusCode, body} = await supertest(app).get(`${V1_API}/products?search=test123`);
        expect(statusCode).toEqual(200);
        expect(body.data.length).toEqual(0);
      });
      //  Return Count of Products
      it('should Return Count Of Products ', async () => {
        const {statusCode, body} = await supertest(app).get(`${V1_API}/products`);
        expect(statusCode).toEqual(200);
        expect(body.count).toEqual(5);

        const {statusCode: statusCode10, body: body10} = await supertest(app).get(`${V1_API}/products?limit=10`);
        expect(statusCode10).toEqual(200);
        expect(body10.count).toEqual(10);
      });
      //  Title + descrption + price +category

      it('should Product Has Id, Title ,Desorption,Price , Category.Title , ImageUrl ', async () => {
        const {statusCode, body} = await supertest(app).get(`${V1_API}/products`);
        expect(statusCode).toEqual(200);
        const result = (body.data as IProduct[]).every(p => {
          return Object.keys(p).includes('id') && Object.keys(p).includes('title') && Object.keys(p).includes('description') && Object.keys(p).includes('price') && Object.keys(p.Category!).includes('title') && Object.keys(p).includes('imageUrl');
        });
        expect(result).toEqual(true);
      });
    });
  });
});
