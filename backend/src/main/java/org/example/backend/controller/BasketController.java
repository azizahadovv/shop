package org.example.backend.controller;

import org.example.backend.Db;
import org.example.backend.entity.Basket;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/v1/basket")
public class BasketController {

    // Foydalanuvchi ID bo‘yicha barcha basketlarni olish
    @GetMapping("/user/{id}")
    public List<Basket> getBasketByUserId(@PathVariable UUID id) {
        List<Basket> baskets = new ArrayList<>();
        for (Basket basket : Db.baskets) {
            if (basket.getUserId().equals(id)) {
                baskets.add(basket);
            }
        }
        return baskets;
    }

    // Yangi basket qo‘shish
    @PostMapping
    public Basket addBasket(@RequestBody Basket basket) {
        basket.setId(UUID.randomUUID()); // Har doim yangi ID
        Db.baskets.add(basket);
        return basket;
    }

    // Basketni o‘chirish
    @DeleteMapping("/{id}")
    public void deleteBasket(@PathVariable UUID id) {
        Db.baskets.removeIf(b -> b.getId().equals(id));
    }

    // Barcha basketlarni olish
    @GetMapping
    public List<Basket> getAllBaskets() {
        return Db.baskets;
    }
}
