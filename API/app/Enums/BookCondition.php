<?php

namespace App\Enums;

enum BookCondition: string {
    case NEW  = 'new';
    case USED = 'used';

    public function label(): string {
        return $this === self::NEW ? 'Novo' : 'Usado';
    }
}
