package org.example.backend;

import org.example.backend.entity.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class Db {
    public static List<Product> products = new ArrayList<>();
    public static List<Category> categories = new ArrayList<>();
    public static List<User> users = new ArrayList<>();
    public static List<Basket> baskets = new ArrayList<>();

    public static void generate() {
        User user1 = new User(UUID.randomUUID(), "azizahadov", "123", Role.ADMIN);
        User user2 = new User(UUID.randomUUID(), "bbb", "222", Role.USER);
        User user3 = new User(UUID.randomUUID(), "ddd", "333", Role.USER);
        User user4 = new User(UUID.randomUUID(), "yyy", "444", Role.USER);


        users.addAll(List.of(user1, user2, user3, user4));
        Category category1 = new Category(UUID.randomUUID(), "Elektronika");
        Category category2 = new Category(UUID.randomUUID(), "Bulunamadi");
        Category category3 = new Category(UUID.randomUUID(), "Kalan Bulunamadi");
        Category category4 = new Category(UUID.randomUUID(), "Kalan Bulunamadi");
        categories.addAll(List.of(category1, category2, category3, category4));

        Product product1 = new Product(UUID.randomUUID(), "Noutbook", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic", category1.getId(), user1.getId());
        Product product2 = new Product(UUID.randomUUID(), "Noutbook", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic", category1.getId(), user1.getId());
        Product product3 = new Product(UUID.randomUUID(), "Noutbook", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic", category2.getId(), user2.getId());
        Product product4 = new Product(UUID.randomUUID(), "Noutbook", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic", category2.getId(), user2.getId());
        Product product5 = new Product(UUID.randomUUID(), "Noutbook", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic", category3.getId(), user3.getId());
        Product product6 = new Product(UUID.randomUUID(), "Noutbook", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic", category3.getId(), user3.getId());
        Product product7 = new Product(UUID.randomUUID(), "Noutbook", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic", category4.getId(), user4.getId());
        Product product8 = new Product(UUID.randomUUID(), "Noutbook", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic", category4.getId(), user4.getId());
        products.addAll(List.of(product1, product2, product3, product4, product5, product6, product7));


    }


}
