import {Body, Get, HttpCode, HttpStatus, Param, Post, Query, Req} from '@nestjs/common';
import {Request} from 'express';
import {PathHash, GeneratePrivateKey, PathAddress, QueryMnemonic, PathXpub} from '@tatumio/blockchain-connector-common';
import {
  BroadcastTx,
  EgldEsdtTransaction,
  EgldSendTransaction,
} from '@tatumio/tatum';
import {EgldError} from './EgldError';
import {EgldService} from './EgldService';

export abstract class EgldController {
  protected constructor(protected readonly service: EgldService) {
  }

  @Post('v3/egld/web3/:xApiKey/*')
  @HttpCode(HttpStatus.OK)
  public async web3MethodPost(@Req() req: Request, @Param() param: { key: string }) {
    try {
      return await this.service.web3Method(req, param.key);
    } catch (e) {
      throw new EgldError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'egld.error');
    }
  }

  @Get('v3/egld/web3/:xApiKey/*')
  @HttpCode(HttpStatus.OK)
  public async web3MethodGet(@Req() req: Request, @Param() param: { key: string }) {
    try {
      return await this.service.web3Method(req, param.key);
    } catch (e) {
      throw new EgldError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'egld.error');
    }
  }

  @Post('v3/egld/transaction')
  @HttpCode(HttpStatus.OK)
  public async sendEgldTransaction(@Body() body: EgldEsdtTransaction) {
    try {
      return await this.service.sendEgldTransaction(body);
    } catch (e) {
      throw new EgldError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'egld.error');
    }
  }

  @Post('v3/egld/gas')
  @HttpCode(HttpStatus.OK)
  public async estimateGas(@Body() body: EgldSendTransaction) {
    try {
      return await this.service.estimateGas(body);
    } catch (e) {
      throw new EgldError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'egld.error');
    }
  }

  @Get('v3/egld/transaction/count/:address')
  @HttpCode(HttpStatus.OK)
  public async countTransactions(@Param() param: PathAddress) {
    try {
      return await this.service.getTransactionCount(param.address);
    } catch (e) {
      throw new EgldError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'egld.error');
    }
  }

  @Post('v3/egld/broadcast')
  @HttpCode(HttpStatus.OK)
  public async broadcast(@Body() body: BroadcastTx) {
    try {
      return await this.service.broadcast(body.txData, body.signatureId);
    } catch (e) {
      throw new EgldError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'egld.error');
    }
  }

  @Get('v3/egld/block/current')
  @HttpCode(HttpStatus.OK)
  public async getCurrentBlock() {
    try {
      return await this.service.getCurrentBlock();
    } catch (e) {
      throw new EgldError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'egld.error');
    }
  }

  @Get('v3/egld/account/balance/:address')
  @HttpCode(HttpStatus.OK)
  public async getAccountBalance(@Param() path: PathAddress) {
    try {
      return await this.service.getBalance(path.address);
    } catch (e) {
      throw new EgldError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'egld.error');
    }
  }

  // @Get('v3/egld/address/:xpub/:i')
  // @HttpCode(HttpStatus.OK)
  // public async generateAddress(@Param() { xpub, i }: PathXpub) {
  //   try {
  //     return await this.service.generateAddress(xpub, i);
  //   } catch (e) {
  //     throw new EgldError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'egld.error');
  //   }
  // }

  @Get('v3/egld/wallet')
  @HttpCode(HttpStatus.OK)
  async generateWallet(@Query() { mnemonic }: QueryMnemonic) {
    try {
      return await this.service.generateWallet(mnemonic)
    } catch (e) {
      throw new EgldError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'egld.error');
    }
  }

  @Post('v3/egld/wallet/priv')
  @HttpCode(HttpStatus.OK)
  async generatePrivateKey(@Body() { mnemonic, index }: GeneratePrivateKey) {
    try {
      return await this.service.generatePrivateKey(mnemonic, index)
    } catch (e) {
      throw new EgldError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'egld.error');
    }
  }
    
  @Get('v3/egld/block/:hash')
  @HttpCode(HttpStatus.OK)
  public async getBlock(@Param() path: PathHash) {
    try {
      return await this.service.getBlock(path.hash);
    } catch (e) {
      throw new EgldError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'egld.error');
    }
  }

  @Get('v3/egld/transaction/:hash')
  public async getTransaction(@Param() path: PathHash) {
    try {
      return await this.service.getTransaction(path.hash);
    } catch (e) {
      throw new EgldError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'egld.error');
    }
  }

  @Post('v3/egld/smartcontract/deploy')
  @HttpCode(HttpStatus.OK)
  public async deploySmartContract(@Body() body: EgldEsdtTransaction) {
    try {
      return await this.service.deploySmartContract(body);
    } catch (e) {
      throw new EgldError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'egld.error');
    }
  }

  @Post('v3/egld/smartcontract/mint')
  @HttpCode(HttpStatus.OK)
  public async mintSmartContract(@Body() body: EgldEsdtTransaction) {
    try {
      return await this.service.mintSmartContract(body);
    } catch (e) {
      throw new EgldError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'egld.error');
    }
  }

  @Post('v3/egld/smartcontract/burn')
  @HttpCode(HttpStatus.OK)
  public async burnSmartContract(@Body() body: EgldEsdtTransaction) {
    try {
      return await this.service.burnSmartContract(body);
    } catch (e) {
      throw new EgldError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'egld.error');
    }
  }

  @Post('v3/egld/smartcontract/pause')
  @HttpCode(HttpStatus.OK)
  public async pauseSmartContract(@Body() body: EgldEsdtTransaction) {
    try {
      return await this.service.pauseSmartContract(body);
    } catch (e) {
      throw new EgldError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'egld.error');
    }
  }

  @Post('v3/egld/smartcontract/role')
  @HttpCode(HttpStatus.OK)
  public async specialRoleSmartContract(@Body() body: EgldEsdtTransaction) {
    try {
      return await this.service.specialRoleSmartContract(body);
    } catch (e) {
      throw new EgldError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'egld.error');
    }
  }

  @Post('v3/egld/smartcontract/freeze')
  @HttpCode(HttpStatus.OK)
  public async freezeSmartContract(@Body() body: EgldEsdtTransaction) {
    try {
      return await this.service.freezeOrWipeOrOwvershipSmartContract(body);
    } catch (e) {
      throw new EgldError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'egld.error');
    }
  }

  @Post('v3/egld/smartcontract/wipe')
  @HttpCode(HttpStatus.OK)
  public async wipeSmartContract(@Body() body: EgldEsdtTransaction) {
    try {
      return await this.service.freezeOrWipeOrOwvershipSmartContract(body);
    } catch (e) {
      throw new EgldError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'egld.error');
    }
  }

  @Post('v3/egld/smartcontract/owner')
  @HttpCode(HttpStatus.OK)
  public async ownerSmartContract(@Body() body: EgldEsdtTransaction) {
    try {
      return await this.service.freezeOrWipeOrOwvershipSmartContract(body);
    } catch (e) {
      throw new EgldError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'egld.error');
    }
  }
  
  @Post('v3/egld/smartcontract/control')
  @HttpCode(HttpStatus.OK)
  public async controlChangesSmartContract(@Body() body: EgldEsdtTransaction) {
    try {
      return await this.service.controlChangesSmartContract(body);
    } catch (e) {
      throw new EgldError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'egld.error');
    }
  }

  @Post('v3/egld/smartcontract/transfer')
  @HttpCode(HttpStatus.OK)
  public async invokeSmartContractMethod(@Body() body: EgldEsdtTransaction) {
    try {
      return await this.service.invokeSmartContractMethod(body);
    } catch (e) {
      throw new EgldError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'egld.error');
    }
  }

  @Post('v3/egld/nft/deploy')
  @HttpCode(HttpStatus.OK)
  public async deployNft(@Body() body: EgldEsdtTransaction) {
    try {
      return await this.service.deployNft(body);
    } catch (e) {
      throw new EgldError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'egld.error');
    }
  }

  @Post('v3/egld/nft/create')
  @HttpCode(HttpStatus.OK)
  public async createNft(@Body() body: EgldEsdtTransaction) {
    try {
      return await this.service.createNft(body);
    } catch (e) {
      throw new EgldError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'egld.error');
    }
  }

  @Post('v3/egld/nft/role-transfer')
  @HttpCode(HttpStatus.OK)
  public async roleTransferNft(@Body() body: EgldEsdtTransaction) {
    try {
      return await this.service.roleTransferNft(body);
    } catch (e) {
      throw new EgldError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'egld.error');
    }
  }
  
  @Post('v3/egld/nft/stop-create')
  @HttpCode(HttpStatus.OK)
  public async stopNftCreate(@Body() body: EgldEsdtTransaction) {
    try {
      return await this.service.stopNftCreate(body);
    } catch (e) {
      throw new EgldError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'egld.error');
    }
  }
  
  @Post('v3/egld/nft/add')
  @HttpCode(HttpStatus.OK)
  public async addNftQuantity(@Body() body: EgldEsdtTransaction) {
    try {
      return await this.service.addOrBurnNftQuantity(body);
    } catch (e) {
      throw new EgldError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'egld.error');
    }
  }
  
  @Post('v3/egld/nft/burn')
  @HttpCode(HttpStatus.OK)
  public async burnNftQuantity(@Body() body: EgldEsdtTransaction) {
    try {
      return await this.service.addOrBurnNftQuantity(body);
    } catch (e) {
      throw new EgldError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'egld.error');
    }
  }

  @Post('v3/egld/nft/freeze')
  @HttpCode(HttpStatus.OK)
  public async freezeNft(@Body() body: EgldEsdtTransaction) {
    try {
      return await this.service.freezeNft(body);
    } catch (e) {
      throw new EgldError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'egld.error');
    }
  }

  @Post('v3/egld/nft/wipe')
  @HttpCode(HttpStatus.OK)
  public async wipeNft(@Body() body: EgldEsdtTransaction) {
    try {
      return await this.service.wipeNft(body);
    } catch (e) {
      throw new EgldError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'egld.error');
    }
  }

  @Post('v3/egld/nft/transfer')
  @HttpCode(HttpStatus.OK)
  public async transferNft(@Body() body: EgldEsdtTransaction) {
    try {
      return await this.service.transferNft(body);
    } catch (e) {
      throw new EgldError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'egld.error');
    }
  }
}
