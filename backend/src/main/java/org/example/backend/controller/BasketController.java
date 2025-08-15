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

    @GetMapping("/userId")
    public List<Basket> addBasket(@PathVariable UUID id) {
        List<Basket> baskets = new ArrayList<>();
        for (Basket basket : Db.baskets) {
            if (basket.getUserId().equals(id)) {
                baskets.add(basket);
            }
        }

        return baskets;

    }


}
